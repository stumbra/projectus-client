import React from 'react';
import { motion } from 'framer-motion';
import {
  Button as SemanticButton,
  Dimmer,
  Loader,
  Menu,
  Pagination,
  Table,
  Modal,
} from 'semantic-ui-react';
import { GET_ASSIGNED_PROJECTS_QUERY, DELETE_PROJECT_MUTATION } from './gql';
import { useMutation, useQuery } from '@apollo/client';
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
import { CreateProjectModal, EditProjectModal } from 'src/components';
import { useHistory } from 'react-router';
import { ProjectType } from 'src/types/types';

const ITEMS_PER_PAGE = 8;

const Projects = (): React.ReactElement => {
  const { t } = useTranslation('common');

  const history = useHistory();

  const { loading, data: { getAssignedProjects } = {}, refetch } = useQuery(
    GET_ASSIGNED_PROJECTS_QUERY
  );

  const { user } = React.useContext(AuthContext);

  const [currentPage, setCurrentPage] = React.useState(1);
  const [isConfirmModalVisible, setConfirmModalVisibility] = React.useState(
    false
  );
  const [isEditModalVisible, setEditModalVisibility] = React.useState(false);
  const [isCreateModalVisible, setCreateModalVisibility] = React.useState(
    false
  );
  const [selectedProject, setSelectedProject] = React.useState<
    ProjectType | undefined
  >(undefined);
  const [search, setSearch] = React.useState('');

  const [deleteProject, { loading: deleting }] = useMutation(
    DELETE_PROJECT_MUTATION,
    {
      update(proxy) {
        const data = proxy.readQuery({
          query: GET_ASSIGNED_PROJECTS_QUERY,
        }) as { getAssignedProjects: ProjectType[] };
        proxy.writeQuery({
          query: GET_ASSIGNED_PROJECTS_QUERY,
          data: {
            getAssignedProjects: data.getAssignedProjects.filter(
              (p) => p.id !== selectedProject?.id
            ),
          },
        });
      },
      onError: (err) => {
        console.error(err);
      },
    }
  );

  if (loading || deleting) {
    return (
      <Dimmer active inverted>
        <Loader size="massive">{t('common.loading')}</Loader>
      </Dimmer>
    );
  }

  const handlePageChange = (e, data) => setCurrentPage(data.activePage);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const filteredProjects = getAssignedProjects.filter((project) =>
    project.title.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastProject = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstProject = indexOfLastProject - ITEMS_PER_PAGE;
  const currentProjects = filteredProjects.slice(
    indexOfFirstProject,
    indexOfLastProject
  );

  const MAX_PAGES = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);

  return (
    <React.Fragment>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Container>
          <Buttons>
            <SemanticButton
              primary
              icon
              labelPosition="right"
              onClick={() => {
                setCreateModalVisibility(true);
              }}
            >
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
            <Table
              celled
              fixed
              striped
              style={{ marginTop: '1rem !important' }}
            >
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
                  const isOwner = project.owners.find(
                    (person) => person.id === user?.id
                  );
                  return (
                    <Table.Row key={project.id}>
                      <Table.Cell textAlign="center">
                        {`${project.title} `}
                        {project.githubReleasesURL && <Icon name="github" />}
                      </Table.Cell>
                      <ResponsiveCell>
                        <ExpandedText text={project.description} />
                      </ResponsiveCell>
                      <Table.Cell>
                        <AvatarGroup
                          users={[...project.owners, ...project.personnel]}
                          max={8}
                        />
                      </Table.Cell>
                      <Table.Cell textAlign="center">
                        {moment(project.createdAt).fromNow()}
                      </Table.Cell>
                      <ActionsWrapper textAlign="center">
                        <Button
                          animated="vertical"
                          color="blue"
                          onClick={() => {
                            history.push(`/board/${project.board.id}`);
                          }}
                        >
                          <Button.Content hidden>
                            {t('projects.buttons.view')}
                          </Button.Content>
                          <Button.Content visible>
                            <Icon name="eye" />
                          </Button.Content>
                        </Button>
                        {isOwner && (
                          <React.Fragment>
                            <Button
                              animated="vertical"
                              color="green"
                              onClick={() => {
                                setSelectedProject(project);
                                setEditModalVisibility(true);
                              }}
                            >
                              <Button.Content hidden>
                                {t('projects.buttons.manage')}
                              </Button.Content>
                              <Button.Content visible>
                                <Icon name="edit" />
                              </Button.Content>
                            </Button>
                            <Button
                              animated="vertical"
                              color="red"
                              onClick={() => {
                                setSelectedProject(project);
                                setConfirmModalVisibility(true);
                              }}
                            >
                              <Button.Content hidden>
                                {t('projects.buttons.remove')}
                              </Button.Content>
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
              subheader={t('projects.messages.noAssigned.description')}
            />
          )}
        </Container>
      </motion.div>
      {selectedProject && (
        <Modal
          onClose={() => {
            setSelectedProject(undefined);
            setConfirmModalVisibility(false);
          }}
          open={isConfirmModalVisible}
          size="mini"
        >
          <Modal.Header>{t('projects.modal.title')}</Modal.Header>
          <Modal.Content>
            <p>{t('projects.modal.subtitle')}</p>
          </Modal.Content>
          <Modal.Actions>
            <Button
              color="red"
              onClick={() => {
                deleteProject({ variables: { project: selectedProject.id } });
                setConfirmModalVisibility(false);
              }}
            >
              {t('projects.modal.buttons.primary')}
            </Button>
            <Button
              color="grey"
              onClick={() => {
                setConfirmModalVisibility(false);
                setSelectedProject(undefined);
              }}
            >
              {t('projects.modal.buttons.secondary')}
            </Button>
          </Modal.Actions>
        </Modal>
      )}
      {selectedProject && (
        <EditProjectModal
          refetch={refetch}
          project={selectedProject}
          isVisible={isEditModalVisible}
          toggleModal={() => {
            setEditModalVisibility(!isEditModalVisible);
            setSelectedProject(undefined);
          }}
        />
      )}
      <CreateProjectModal
        isVisible={isCreateModalVisible}
        toggleModal={() => {
          setCreateModalVisibility(!isCreateModalVisible);
        }}
      />
    </React.Fragment>
  );
};

export default Projects;
