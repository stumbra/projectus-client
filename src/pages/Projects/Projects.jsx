import React from 'react';
import { motion } from 'framer-motion';
import { Button, Dimmer, Header, Icon, Label, Loader, Menu, Table } from 'semantic-ui-react';
import { GET_ASSIGNED_PROJECTS_QUERY } from './gql';
import { useQuery } from '@apollo/client';
import moment from 'moment';

const Projects = () => {
  const { loading, data: { getAssignedProjects } = {} } = useQuery(GET_ASSIGNED_PROJECTS_QUERY);

  if (loading)
    return (
      <Dimmer active inverted>
        <Loader size="massive">Loading...</Loader>
      </Dimmer>
    );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Header
        as="h1"
        textAlign="center"
        style={{
          marginBottom: '3rem',
        }}
      >
        Your Projects
      </Header>
      <div>
        <Button primary icon labelPosition="right">
          Create new Project
          <Icon name="plus" />
        </Button>
        <Table celled striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell textAlign="center">Project name</Table.HeaderCell>
              <Table.HeaderCell>Description</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">Personnel</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">Created At</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {getAssignedProjects.map((project) => {
              return (
                <Table.Row
                  key={project.name}
                  onClick={() => {
                    console.log('qwe');
                  }}
                >
                  <Table.Cell textAlign="center">{project.title}</Table.Cell>
                  <Table.Cell width="6">{project.description}</Table.Cell>
                  <Table.Cell>
                    {project.owners.map((owner) => {
                      return (
                        <Label image key={owner.avatar}>
                          <img src={owner.avatar} />
                          {`${owner.name} ${owner.surname.charAt(0)}.`}
                        </Label>
                      );
                    })}
                    {project.personnel.map((person) => {
                      return (
                        <Label image key={person.avatar}>
                          <img src={person.avatar} />
                          {`${person.name} ${person.surname.charAt(0)}.`}
                        </Label>
                      );
                    })}
                  </Table.Cell>
                  <Table.Cell textAlign="center">{moment(project.createdAt).fromNow()}</Table.Cell>
                  <Table.Cell textAlign="center">
                    <Button animated="vertical" color="blue">
                      <Button.Content hidden>View</Button.Content>
                      <Button.Content visible>
                        <Icon name="eye" />
                      </Button.Content>
                    </Button>
                    <Button animated="vertical" color="green">
                      <Button.Content hidden>Manage</Button.Content>
                      <Button.Content visible>
                        <Icon name="edit" />
                      </Button.Content>
                    </Button>
                    <Button animated="vertical" color="red">
                      <Button.Content hidden>Remove</Button.Content>
                      <Button.Content visible>
                        <Icon name="delete" />
                      </Button.Content>
                    </Button>
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan="5">
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

export default Projects;
