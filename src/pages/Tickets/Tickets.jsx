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
import { GET_ASSIGNED_TICKETS_QUERY } from './gql';
import { useQuery } from '@apollo/client';
import moment from 'moment';
import { AvatarGroup, Empty } from '../../components';
import {
  SearchWrapper,
  SearchInput,
  Container,
  TableHeader,
  Icon,
  TableRow,
  NoAssignees,
} from './Tickets.styled';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';

const ITEMS_PER_PAGE = 8;

const Tickets = () => {
  const { loading, data: { getAssignedTickets } = {} } = useQuery(GET_ASSIGNED_TICKETS_QUERY, {
    fetchPolicy: 'no-cache',
  });

  const history = useHistory();

  const { t } = useTranslation('common');

  const [currentPage, setCurrentPage] = React.useState(1);

  const [search, setSearch] = React.useState('');

  if (loading)
    return (
      <Dimmer active inverted>
        <Loader size="massive">{t('common.loading')}</Loader>
      </Dimmer>
    );

  const handlePageChange = (e, { activePage }) => setCurrentPage(activePage);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const filteredTickets = getAssignedTickets.filter((ticket) =>
    ticket.title.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastTicket = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstTicket = indexOfLastTicket - ITEMS_PER_PAGE;
  const currentTickets = filteredTickets.slice(indexOfFirstTicket, indexOfLastTicket);

  const MAX_PAGES = Math.round(filteredTickets.length / ITEMS_PER_PAGE);

  const localizeTicketType = (value) => {
    switch (value) {
      case 'FEATURE': {
        return t('common.types.feature');
      }
      case 'IMPROVEMENT': {
        return t('common.types.improvement');
      }
      case 'MAINTENANCE': {
        return t('common.types.maintenance');
      }
      case 'REQUEST': {
        return t('common.types.request');
      }
      case 'SERVICE': {
        return t('common.types.service');
      }
      case 'BUG': {
        return t('common.types.bug');
      }
    }
  };

  const localizeTicketPriority = (value) => {
    switch (value) {
      case 'NONE': {
        return t('common.priorities.none');
      }
      case 'LOW': {
        return t('common.priorities.low');
      }
      case 'MEDIUM': {
        return t('common.priorities.medium');
      }
      case 'HIGH': {
        return t('common.priorities.high');
      }
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Container>
        <SearchWrapper>
          <SearchInput
            value={search}
            onChange={handleSearchChange}
            icon="search"
            placeholder={t('tickets.search')}
            onFocus={() => {
              setCurrentPage(1);
            }}
            disabled={getAssignedTickets.length === 0}
          />
        </SearchWrapper>

        {currentTickets.length > 0 && (
          <Table celled fixed style={{ marginTop: '1rem !important' }}>
            <TableHeader>
              <Table.Row>
                <Table.HeaderCell textAlign="center">
                  {t('tickets.headers.projectName')}
                </Table.HeaderCell>
                <Table.HeaderCell textAlign="center">
                  {t('tickets.headers.ticketTitle')}
                </Table.HeaderCell>
                <Table.HeaderCell textAlign="center">
                  {t('tickets.headers.assignees')}
                </Table.HeaderCell>
                <Table.HeaderCell textAlign="center">{t('tickets.headers.type')}</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">
                  {t('tickets.headers.priorityLevel')}
                </Table.HeaderCell>
                <Table.HeaderCell textAlign="center">
                  {t('tickets.headers.created')}
                </Table.HeaderCell>
                <Table.HeaderCell textAlign="center">
                  {t('tickets.headers.actions')}
                </Table.HeaderCell>
              </Table.Row>
            </TableHeader>
            <Table.Body>
              {currentTickets.map((ticket) => {
                return (
                  <TableRow key={ticket.id} priority={ticket.priority}>
                    <Table.Cell textAlign="center">{ticket.section.board.project.title}</Table.Cell>
                    <Table.Cell textAlign="center">{`#${ticket.number} ${ticket.title}`}</Table.Cell>
                    <Table.Cell>
                      {ticket.assignees.length > 0 ? (
                        <AvatarGroup users={[...ticket.assignees]} max={8} />
                      ) : (
                        <NoAssignees>{t('tickets.noAssignees')}</NoAssignees>
                      )}
                    </Table.Cell>
                    <Table.Cell textAlign="center">{localizeTicketType(ticket.type)}</Table.Cell>
                    <Table.Cell textAlign="center">
                      {localizeTicketPriority(ticket.priority)}
                    </Table.Cell>
                    <Table.Cell textAlign="center">{moment(ticket.createdAt).fromNow()}</Table.Cell>
                    <Table.Cell textAlign="center">
                      <SemanticButton
                        animated="vertical"
                        color="blue"
                        onClick={() => history.push(`/ticket/${ticket.id}`)}
                      >
                        <SemanticButton.Content hidden>
                          {t('tickets.buttons.view')}
                        </SemanticButton.Content>
                        <SemanticButton.Content visible>
                          <Icon name="eye" />
                        </SemanticButton.Content>
                      </SemanticButton>
                    </Table.Cell>
                  </TableRow>
                );
              })}
            </Table.Body>
            <Table.Footer>
              <Table.Row>
                <Table.HeaderCell colSpan="7">
                  <Menu floated="right">
                    <Pagination
                      defaultActivePage={currentPage}
                      totalPages={MAX_PAGES === 0 ? 1 : MAX_PAGES}
                      onPageChange={handlePageChange}
                    />
                  </Menu>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
          </Table>
        )}
        {filteredTickets.length === 0 && search !== '' && (
          <Empty
            header={t('tickets.messages.noResults.title')}
            subheader={t('tickets.messages.noResults.description')}
          />
        )}
        {getAssignedTickets.length === 0 && (
          <Empty
            header={t('tickets.messages.noAssigned.title')}
            subheader={t('tickets.messages.noAssigned.description')}
          />
        )}
      </Container>
    </motion.div>
  );
};

export default Tickets;
