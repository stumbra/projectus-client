import React from 'react';
import { motion } from 'framer-motion';
import {
  Button as SemanticButton,
  Dimmer,
  Loader,
  Menu,
  Pagination,
  Table,
} from 'semantic-ui-react';
import { GET_ASSIGNED_PROJECTS_QUERY, DELETE_PROJECT_MUTATION } from './gql';
import { makeVar, useMutation, useQuery } from '@apollo/client';
import moment from 'moment';
import { ExpandedText, AvatarGroup, Empty } from '../../components';
import {
  Container,
  Buttons,
  SearchInput,
  TableHeader,
  ResponsiveCell,
  Icon,
  ActionsWrapper,
  Button,
} from './Projects.styled';
import { AuthContext } from '../../context/auth';
import { useTranslation } from 'react-i18next';

const ITEMS_PER_PAGE = 8;

const Projects = () => {
  const { t } = useTranslation('common');

  const { loading, data: { getAssignedProjects } = {} } = useQuery(GET_ASSIGNED_PROJECTS_QUERY);

  const projectVar = makeVar();

  const [deleteProject, { loading: deleting }] = useMutation(DELETE_PROJECT_MUTATION, {
    update(proxy) {
      const data = proxy.readQuery({ query: GET_ASSIGNED_PROJECTS_QUERY });
      proxy.writeQuery({
        query: GET_ASSIGNED_PROJECTS_QUERY,
        data: {
          getAssignedProjects: data.getAssignedProjects.filter((p) => p.id !== projectVar()),
        },
      });
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const { user } = React.useContext(AuthContext);

  const [currentPage, setCurrentPage] = React.useState(1);

  const [search, setSearch] = React.useState('');

  if (loading || deleting)
    return (
      <Dimmer active inverted>
        <Loader size="massive">{t('common.loading')}</Loader>
      </Dimmer>
    );

  const handlePageChange = (e, { activePage }) => setCurrentPage(activePage);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const filteredProjects = getAssignedProjects.filter((project) =>
    project.title.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastProject = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstProject = indexOfLastProject - ITEMS_PER_PAGE;
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);

  const MAX_PAGES = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);

  return (
    <React.Fragment>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <Container>
          <Buttons>
            <SemanticButton primary icon labelPosition="right">
              {t('projects.create')}
              <Icon name="plus" />
            </SemanticButton>
            <SearchInput
              value={search}
              onChange={handleSearchChange}
              icon="search"
              placeholder={t('projects.search')}
              onFocus={() => {
                setCurrentPage(1);
              }}
              disabled={getAssignedProjects.length === 0}
            />
          </Buttons>

          {currentProjects.length > 0 && (
            <Table celled fixed striped style={{ marginTop: '1rem !important' }}>
              <TableHeader>
                <Table.Row>
                  <Table.HeaderCell textAlign="center">
                    {t('projects.headers.name')}
                  </Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">
                    {t('projects.headers.description')}
                  </Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">
                    {t('projects.headers.personnel')}
                  </Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">
                    {t('projects.headers.created')}
                  </Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">
                    {t('projects.headers.actions')}
                  </Table.HeaderCell>
                </Table.Row>
              </TableHeader>
              <Table.Body>
                {currentProjects.map((project) => {
                  const isOwner = project.owners.find((person) => person.id === user?.id);
                  return (
                    <Table.Row key={project.id}>
                      <Table.Cell textAlign="center">{project.title}</Table.Cell>
                      <ResponsiveCell>
                        <ExpandedText text={project.description} />
                      </ResponsiveCell>
                      <Table.Cell>
                        <AvatarGroup users={[...project.owners, ...project.personnel]} max={8} />
                      </Table.Cell>
                      <Table.Cell textAlign="center">
                        {moment(project.createdAt).fromNow()}
                      </Table.Cell>
                      <ActionsWrapper textAlign="center">
                        <Button animated="vertical" color="blue">
                          <Button.Content hidden>{t('projects.buttons.view')}</Button.Content>
                          <Button.Content visible>
                            <Icon name="eye" />
                          </Button.Content>
                        </Button>
                        {isOwner && (
                          <React.Fragment>
                            <Button animated="vertical" color="green">
                              <Button.Content hidden>{t('projects.buttons.manage')}</Button.Content>
                              <Button.Content visible>
                                <Icon name="edit" />
                              </Button.Content>
                            </Button>
                            <Button
                              animated="vertical"
                              color="red"
                              onClick={() => {
                                projectVar(project.id);
                                deleteProject({ variables: { project: project.id } });
                              }}
                            >
                              <Button.Content hidden>{t('projects.buttons.remove')}</Button.Content>
                              <Button.Content visible>
                                <Icon name="delete" />
                              </Button.Content>
                            </Button>
                          </React.Fragment>
                        )}
                      </ActionsWrapper>
                    </Table.Row>
                  );
                })}
              </Table.Body>
              <Table.Footer>
                <Table.Row>
                  <Table.HeaderCell colSpan="5">
                    <Menu floated="right">
                      <Pagination
                        defaultActivePage={currentPage}
                        totalPages={MAX_PAGES}
                        onPageChange={handlePageChange}
                      />
                    </Menu>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Footer>
            </Table>
          )}
          {filteredProjects.length === 0 && search !== '' && (
            <Empty
              header={t('projects.messages.noResults.title')}
              subheader={t('projects.messages.noResults.description')}
            />
          )}
          {getAssignedProjects.length === 0 && (
            <Empty
              header={t('projects.messages.noAssigned.title')}
              subheader={t('projects.messages.noAssigned.title')}
            />
          )}
        </Container>
      </motion.div>
    </React.Fragment>
  );
};

export default Projects;
