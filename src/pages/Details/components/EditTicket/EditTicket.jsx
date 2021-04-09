import { useMutation } from '@apollo/client';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-semantic-toasts';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import { Button, Dropdown, Form, Header, Input, Modal, TextArea } from 'semantic-ui-react';
import generateTemplate from '../../../Board/components/TicketCreation/templates';
import { UPDATE_TICKET_MUTATION, DELETE_TICKET_MUTATION } from './gql';
import { prepareTypeForAPI, preparePriorityForAPI } from '../../../../utils/helpers';
import { useHistory } from 'react-router';

const EditTicket = ({ isVisible, toggleModal, ticket, refetch }) => {
  const { t, i18n } = useTranslation('common');

  const history = useHistory();

  const typeOptions = [
    { key: 1, text: t('common.types.feature'), value: 1 },
    { key: 2, text: t('common.types.improvement'), value: 2 },
    { key: 3, text: t('common.types.maintenance'), value: 3 },
    { key: 4, text: t('common.types.request'), value: 4 },
    { key: 5, text: t('common.types.service'), value: 5 },
    { key: 6, text: t('common.types.bug'), value: 6 },
  ];

  const priorityOptions = [
    { key: 1, text: t('common.priorities.none'), value: 1 },
    { key: 2, text: t('common.priorities.low'), value: 2 },
    { key: 3, text: t('common.priorities.medium'), value: 3 },
    { key: 4, text: t('common.priorities.high'), value: 4 },
  ];

  const assignees = ticket.assignees.map((person, index) => {
    return { key: index + 1, text: `${person.name} ${person.surname}`, value: person.id };
  });

  const [values, setValues] = React.useState({
    title: ticket.title,
    type: typeOptions.find((item) =>
      i18n.language === 'en'
        ? item.text.toUpperCase()
        : prepareTypeForAPI(item.text.toUpperCase()) === ticket.type.toUpperCase()
    ).key,
    priority: priorityOptions.find((item) =>
      i18n.language === 'en'
        ? item.text.toUpperCase()
        : preparePriorityForAPI(item.text.toUpperCase()) === ticket.priority.toUpperCase()
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
      type: typeOptions.find((item) =>
        i18n.language === 'en'
          ? item.text.toUpperCase()
          : prepareTypeForAPI(item.text.toUpperCase()) === ticket.type.toUpperCase()
      ).key,
      priority: priorityOptions.find((item) =>
        i18n.language === 'en'
          ? item.text.toUpperCase()
          : preparePriorityForAPI(item.text.toUpperCase()) === ticket.priority.toUpperCase()
      ).key,
      deadline: ticket.deadline && new Date(ticket.deadline),
      description: ticket.description,
      assignees: assignees.map((assignee) => assignee.value),
    }) === JSON.stringify(values);

  const [updateTicket, { loading: updateTicketLoading }] = useMutation(UPDATE_TICKET_MUTATION, {
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
    adjustedValues['type'] =
      i18n.language === 'lt'
        ? prepareTypeForAPI(typeOptions[values.type - 1].text.toUpperCase(), t)
        : typeOptions[values.type - 1].text.toUpperCase();
    adjustedValues['priority'] =
      i18n.language === 'lt'
        ? preparePriorityForAPI(priorityOptions[values.priority - 1].text.toUpperCase(), t)
        : priorityOptions[values.priority - 1].text.toUpperCase();
    adjustedValues['assignees'] = values.assignees;

    updateTicket({
      variables: adjustedValues,
      refetchQueries: () => ['getTicket', 'getAssignedTickets'],
    });
  };

  const [deleteTicket, { loading: deleteTicketLoading }] = useMutation(DELETE_TICKET_MUTATION, {
    update: () => {
      toast({
        type: 'success',
        icon: 'check',
        title: 'Success!',
        description: 'Ticket successfully deleted',
        animation: 'bounce',
        time: 5000,
      });
      history.goBack();
    },
    onError(err) {
      console.error(err);
    },
  });

  const handleDelete = () => {
    deleteTicket({
      variables: {
        ticket: ticket.id,
      },
      refetchQueries: () => ['getBoardInformation'],
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
                        ? generateTemplate(data.options[data.value - 1].text.toUpperCase(), t, i18n)
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
          negative
          onClick={handleDelete}
          floated="left"
          loading={deleteTicketLoading}
          disabled={deleteTicketLoading}
        >
          Delete
        </Button>
        <Button
          color="blue"
          disabled={disableSave || updateTicketLoading || deleteTicketLoading}
          loading={updateTicketLoading}
          onClick={handleSumbit}
        >
          Save
        </Button>
        <Button
          color="grey"
          onClick={toggleModal}
          disabled={updateTicketLoading || deleteTicketLoading}
        >
          Close
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default EditTicket;
