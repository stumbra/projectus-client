import React from 'react';
import { motion } from 'framer-motion';
import { Button, Dimmer, Header, Icon, Label, Loader, Menu, Table } from 'semantic-ui-react';
import { GET_ASSIGNED_TICKETS_QUERY } from './gql';
import { useQuery } from '@apollo/client';
import moment from 'moment';

const Tickets = () => {
  const { loading, data: { getAssignedTickets } = {} } = useQuery(GET_ASSIGNED_TICKETS_QUERY);

  if (loading)
    return (
      <Dimmer active inverted>
        <Loader size="massive">Loading...</Loader>
      </Dimmer>
    );

  // console.log(getAssignedTickets);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Header
        as="h1"
        textAlign="center"
        style={{
          marginBottom: '3rem',
        }}
      >
        Your Tickets
      </Header>
      <div>
        <Table celled striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell textAlign="center">Project name</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">Ticket title</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">Assignees</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">Type</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">Priority level</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">Created At</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">Action</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {getAssignedTickets.map((ticket) => {
              console.log(ticket);
              return (
                <Table.Row key={ticket.name}>
                  <Table.Cell textAlign="center">{ticket.section.board.project.title}</Table.Cell>
                  <Table.Cell textAlign="center">{`#${ticket.number} ${ticket.title}`}</Table.Cell>
                  <Table.Cell>
                    {ticket.assignees.length > 0 ? (
                      ticket.assignees.map((assignee) => {
                        return (
                          <Label image key={assignee.avatar}>
                            <img src={assignee.avatar} />
                            {`${assignee.name} ${assignee.surname.charAt(0)}.`}
                          </Label>
                        );
                      })
                    ) : (
                      <div>No Assignees</div>
                    )}
                  </Table.Cell>
                  <Table.Cell textAlign="center">{ticket.type}</Table.Cell>
                  <Table.Cell textAlign="center">{ticket.priority}</Table.Cell>
                  <Table.Cell textAlign="center">{moment(ticket.createdAt).fromNow()}</Table.Cell>
                  <Table.Cell textAlign="center">
                    <Button animated="vertical" color="blue">
                      <Button.Content hidden>View</Button.Content>
                      <Button.Content visible>
                        <Icon name="eye" />
                      </Button.Content>
                    </Button>
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan="7">
                <Menu floated="right" pagination>
                  <Menu.Item as="a" icon>
                    <Icon name="chevron left" />
                  </Menu.Item>
                  <Menu.Item as="a">1</Menu.Item>
                  <Menu.Item as="a">2</Menu.Item>
                  <Menu.Item as="a">3</Menu.Item>
                  <Menu.Item as="a">4</Menu.Item>
                  <Menu.Item as="a" icon>
                    <Icon name="chevron right" />
                  </Menu.Item>
                </Menu>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      </div>
    </motion.div>
  );
};

export default Tickets;
