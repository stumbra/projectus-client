import { useMutation } from '@apollo/client';
import React from 'react';
import { toast } from 'react-semantic-toasts';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import { Button, Dropdown, Form, Header, Input, Modal, TextArea } from 'semantic-ui-react';
import generateTemplate from '../../../Board/components/TicketCreation/templates';
import { UPDATE_TICKET_MUTATION } from './gql';

const typeOptions = [
  { key: 1, text: 'Feature', value: 1 },
  { key: 2, text: 'Improvement', value: 2 },
  { key: 3, text: 'Maintenance', value: 3 },
  { key: 4, text: 'Request', value: 4 },
  { key: 5, text: 'Service', value: 5 },
  { key: 6, text: 'Bug', value: 6 },
];

const priorityOptions = [
  { key: 1, text: 'None', value: 1 },
  { key: 2, text: 'Low', value: 2 },
  { key: 3, text: 'Medium', value: 3 },
  { key: 4, text: 'High', value: 4 },
];

const EditTicket = ({ isVisible, toggleModal, ticket, refetch }) => {
  const assignees = ticket.assignees.map((person, index) => {
    return { key: index + 1, text: `${person.name} ${person.surname}`, value: person.id };
  });

  const [values, setValues] = React.useState({
    title: ticket.title,
    type: typeOptions.find(
      (item) => item.text.toLowerCase().trim() === ticket.type.toLowerCase().trim()
    ).key,
    priority: priorityOptions.find(
      (item) => item.text.toLowerCase().trim() === ticket.priority.toLowerCase().trim()
    ).key,
    deadline: ticket.deadline && new Date(ticket.deadline),
    description: ticket.description,
    assignees: assignees.map((assignee) => assignee.value),
  });

  const personnel = [
    ...ticket.section.board.project.owners,
    ...ticket.section.board.project.personnel,
  ].map((person, index) => {
    return { key: index + 1, text: `${person.name} ${person.surname}`, value: person.id };
  });

  const disableSave =
    !values.title ||
    !values.type ||
    !values.priority ||
    JSON.stringify({
      title: ticket.title,
      type: typeOptions.find(
        (item) => item.text.toLowerCase().trim() === ticket.type.toLowerCase().trim()
      ).key,
      priority: priorityOptions.find(
        (item) => item.text.toLowerCase().trim() === ticket.priority.toLowerCase().trim()
      ).key,
      deadline: ticket.deadline && new Date(ticket.deadline),
      description: ticket.description,
      assignees: assignees.map((assignee) => assignee.value),
    }) === JSON.stringify(values);

  const [updateTicket, { loading }] = useMutation(UPDATE_TICKET_MUTATION, {
    update: () => {
      refetch();
      toast({
        type: 'success',
        icon: 'check',
        title: 'Success!',
        description: 'Ticket successfully created',
        animation: 'bounce',
        time: 5000,
      });
      toggleModal();
    },
    onError(err) {
      console.error(err);
    },
  });

  const handleSumbit = () => {
    const adjustedValues = {};

    adjustedValues['ticket'] = ticket.id;
    adjustedValues['title'] = values.title;
    adjustedValues['description'] = values.description;
    adjustedValues['deadline'] = new Date(values.deadline).toISOString();
    adjustedValues['type'] = typeOptions[values.type - 1].text.toUpperCase();
    adjustedValues['priority'] = priorityOptions[values.priority - 1].text.toUpperCase();
    adjustedValues['assignees'] = values.assignees;

    updateTicket({
      variables: adjustedValues,
      refetchQueries: () => ['getTicket', 'getAssignedTickets'],
    });
  };

  return (
    <Modal onClose={toggleModal} open={isVisible} size="tiny">
      <Modal.Header>Edit Ticket</Modal.Header>
      <Modal.Content>
        <Form style={{ margin: '0 35px' }}>
          <Input
            fluid
            label="Title"
            name="title"
            type="text"
            value={values.title}
            placeholder="Type ticket title..."
            onChange={(event) => {
              setValues((prevValues) => {
                return { ...prevValues, title: event.target.value };
              });
            }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '26px' }}>
            <div>
              <Header size="tiny">Ticket type</Header>
              <Dropdown
                name="type"
                clearable
                options={typeOptions}
                selection
                value={values.type}
                placeholder="Choose the type..."
                onChange={(_, data) =>
                  setValues((prevValues) => {
                    return {
                      ...prevValues,
                      description: data.value
                        ? generateTemplate(data.options[data.value - 1].text.toUpperCase())
                        : '',
                      type: data.value,
                    };
                  })
                }
              />
            </div>
            <div>
              <Header size="tiny">Ticket priority</Header>
              <Dropdown
                name="priority"
                clearable
                options={priorityOptions}
                selection
                placeholder="Choose the priority..."
                value={values.priority}
                onChange={(_, data) =>
                  setValues((prevValues) => {
                    return {
                      ...prevValues,
                      priority: data.value,
                    };
                  })
                }
              />
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '26px',
            }}
          >
            <div>
              <Header size="tiny">Assignees</Header>
              <Dropdown
                name="assignees"
                clearable
                multiple
                options={personnel}
                value={values.assignees}
                selection
                placeholder="Choose the assignees..."
                style={{ maxWidth: '196px' }}
                onChange={(_, data) => {
                  setValues((prevValues) => {
                    return {
                      ...prevValues,
                      assignees: data.value,
                    };
                  });
                }}
              />
            </div>
            <div>
              <Header size="tiny">Deadline</Header>
              <SemanticDatepicker
                name="deadline"
                value={values.deadline}
                onChange={(_, data) => {
                  setValues((prevValues) => {
                    return {
                      ...prevValues,
                      deadline: data.value ? new Date(data.value) : null,
                    };
                  });
                }}
              />
            </div>
          </div>
          <Header size="tiny">Description</Header>
          <TextArea
            name="description"
            placeholder="Type ticket description..."
            value={values.description}
            style={{ minHeight: 200 }}
            onChange={(event) => {
              setValues((prevValues) => {
                return { ...prevValues, description: event.target.value };
              });
            }}
          />
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button
          color="blue"
          disabled={disableSave || loading}
          loading={loading}
          onClick={handleSumbit}
        >
          Save
        </Button>
        <Button color="grey" onClick={toggleModal} disabled={loading}>
          Close
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default EditTicket;
