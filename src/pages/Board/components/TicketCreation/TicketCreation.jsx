import React from 'react';
import { Button, Dropdown, Form, Header, Input, Modal, TextArea } from 'semantic-ui-react';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import { TICKET_CREATION_MUTATION } from './gql';
import { useMutation } from '@apollo/client';
import { toast } from 'react-semantic-toasts';
import generateTemplate from './templates';

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

const TicketCreation = ({ isVisible, toggleModal, personnel, refetch, section }) => {
  const [values, setValues] = React.useState({
    title: '',
    type: null,
    priority: null,
    deadline: null,
    description: '',
    assignees: [],
  });

  const resetValues = () => {
    setValues({
      title: '',
      type: null,
      priority: null,
      deadline: null,
      description: '',
      assignees: [],
    });
  };

  const [createTicket, { loading }] = useMutation(TICKET_CREATION_MUTATION, {
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
    },
    onError(err) {
      console.error(err);
    },
  });

  const handleSubmit = () => {
    const adjustedValues = Object.fromEntries(
      // eslint-disable-next-line no-unused-vars
      Object.entries(values).filter(([_, value]) => value != null)
    );
    createTicket({
      variables: {
        ...adjustedValues,
        section,
      },
    }).then((data) => {
      history.push(`/ticket/${data.id}`);
    });
  };

  const disableSubmit = values.title === '' || !values.type || !values.priority;

  return (
    <Modal onClose={toggleModal} open={isVisible} size="tiny">
      <Modal.Header>Ticket creation</Modal.Header>
      <Modal.Content>
        <Form style={{ margin: '0 35px' }}>
          <Input
            fluid
            label="Title *"
            placeholder="Type ticket title..."
            name="title"
            type="text"
            value={values.title}
            onChange={(event) => {
              setValues((prevValues) => {
                return { ...prevValues, title: event.target.value };
              });
            }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '26px' }}>
            <div>
              <Header size="tiny">Ticket type *</Header>
              <Dropdown
                name="type"
                clearable
                options={typeOptions}
                selection
                placeholder="Choose the type..."
                onChange={(_, data) =>
                  setValues((prevValues) => {
                    return {
                      ...prevValues,
                      description: data.value
                        ? generateTemplate(data.options[data.value - 1].text.toUpperCase())
                        : '',
                      type: data.value
                        ? data.options[data.value - 1].text.toUpperCase()
                        : data.value,
                    };
                  })
                }
              />
            </div>
            <div>
              <Header size="tiny">Ticket priority *</Header>
              <Dropdown
                name="priority"
                clearable
                options={priorityOptions}
                selection
                placeholder="Choose the priority..."
                onChange={(_, data) =>
                  setValues((prevValues) => {
                    return {
                      ...prevValues,
                      priority: data.value
                        ? data.options[data.value - 1].text.toUpperCase()
                        : data.value,
                    };
                  })
                }
              />
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '26px' }}>
            <div>
              <Header size="tiny">Assignees</Header>
              <Dropdown
                name="assignees"
                clearable
                multiple
                options={personnel}
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
                onChange={(_, data) => {
                  setValues((prevValues) => {
                    return {
                      ...prevValues,
                      deadline: data.value ? new Date(data.value).toISOString() : null,
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
        <Button color="blue" onClick={handleSubmit} disabled={disableSubmit} loading={loading}>
          Create
        </Button>
        <Button
          disabled={loading}
          color="grey"
          onClick={() => {
            resetValues();
            toggleModal();
          }}
        >
          Close
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default TicketCreation;
