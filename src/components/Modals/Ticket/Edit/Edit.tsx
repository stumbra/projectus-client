/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from '@apollo/client';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-semantic-toasts';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import {
  Button,
  Dropdown,
  Form,
  Header,
  Input,
  Modal,
  TextArea,
} from 'semantic-ui-react';
import { UPDATE_TICKET_MUTATION, DELETE_TICKET_MUTATION } from './gql';
import {
  prepareTypeForAPI,
  preparePriorityForAPI,
  ensure,
} from '../../../../utils/helpers';
import generateTemplate from '../../../../utils/templates';
import { useHistory } from 'react-router';
import { Section, SecondInput } from './Edit.styled';
import { TicketType } from 'src/types/types';

type OptionType = {
  key: number;
  text: string;
  value: number;
};

type EditProps = {
  isVisible: boolean;
  toggleModal: () => void;
  ticket: TicketType;
  refetch: () => void;
  isTest?: boolean;
};

const Edit = ({
  isVisible,
  toggleModal,
  ticket,
  refetch,
  isTest = false,
}: EditProps): React.ReactElement => {
  const { t, i18n } = useTranslation('common');

  const history = useHistory();

  const typeOptions = [
    { key: 1, text: t('common.types.feature'), value: 1 },
    { key: 2, text: t('common.types.improvement'), value: 2 },
    { key: 3, text: t('common.types.maintenance'), value: 3 },
    { key: 4, text: t('common.types.request'), value: 4 },
    { key: 5, text: t('common.types.service'), value: 5 },
    { key: 6, text: t('common.types.bug'), value: 6 },
  ] as OptionType[];

  const priorityOptions = [
    { key: 1, text: t('common.priorities.none'), value: 1 },
    { key: 2, text: t('common.priorities.low'), value: 2 },
    { key: 3, text: t('common.priorities.medium'), value: 3 },
    { key: 4, text: t('common.priorities.high'), value: 4 },
  ] as OptionType[];

  const assignees = ticket.assignees.map((person, index) => {
    return {
      key: index + 1,
      text: `${person.name} ${person.surname}`,
      value: person.id,
    };
  });

  const [values, setValues] = React.useState<any>({
    title: ticket.title,
    type: ensure(
      typeOptions.find((item) =>
        i18n.language === 'en'
          ? item.text.toString().toUpperCase()
          : prepareTypeForAPI(item?.text?.toUpperCase()) ===
            ticket?.type?.toUpperCase()
      )
    ).key,
    priority: ensure(
      priorityOptions.find((item) =>
        i18n.language === 'en'
          ? item.text.toString().toUpperCase()
          : preparePriorityForAPI(item.text.toUpperCase()) ===
            ticket.priority.toUpperCase()
      )
    ).key,
    deadline: ticket.deadline && new Date(ticket.deadline),
    description: ticket.description,
    assignees: assignees.map((assignee) => assignee.value),
  });

  const personnel = [
    ...ticket.section.board.project.owners,
    ...ticket.section.board.project.personnel,
  ].map((person, index) => {
    return {
      key: index + 1,
      text: `${person.name} ${person.surname}`,
      value: person.id,
    };
  });

  const disableSave =
    !values.title ||
    !values.type ||
    !values.priority ||
    JSON.stringify({
      title: ticket.title,
      type: ensure(
        typeOptions.find((item) =>
          i18n.language === 'en'
            ? item.text.toString().toUpperCase()
            : prepareTypeForAPI(item.text.toUpperCase()) ===
              ticket.type.toUpperCase()
        )
      ).key,
      priority: ensure(
        priorityOptions.find((item) =>
          i18n.language === 'en'
            ? item.text.toString().toUpperCase()
            : preparePriorityForAPI(item.text.toUpperCase()) ===
              ticket.priority.toUpperCase()
        )
      ).key,
      deadline: ticket.deadline && new Date(ticket.deadline),
      description: ticket.description,
      assignees: assignees.map((assignee) => assignee.value),
    }) === JSON.stringify(values);

  const [updateTicket, { loading: updateTicketLoading }] = useMutation(
    UPDATE_TICKET_MUTATION,
    {
      update: () => {
        refetch();
        toast({
          type: 'success',
          icon: 'check',
          title: t('details.editTicket.create.title'),
          description: t('details.editTicket.create.description'),
          animation: 'bounce',
          time: 5000,
        });
        toggleModal();
      },
      onError(err) {
        console.error(err);
      },
    }
  );

  const handleSumbit = () => {
    const adjustedValues = {};

    adjustedValues['ticket'] = ticket.id;
    adjustedValues['title'] = values.title;
    adjustedValues['description'] = values.description;
    adjustedValues['deadline'] = new Date(
      values.deadline as string
    ).toISOString();
    adjustedValues['type'] =
      i18n.language === 'lt'
        ? prepareTypeForAPI(typeOptions[values.type - 1].text.toUpperCase())
        : typeOptions[values.type - 1].text.toUpperCase();
    adjustedValues['priority'] =
      i18n.language === 'lt'
        ? preparePriorityForAPI(
            priorityOptions[values.priority - 1].text.toUpperCase()
          )
        : priorityOptions[values.priority - 1].text.toUpperCase();
    adjustedValues['assignees'] = values.assignees;

    updateTicket({
      variables: adjustedValues,
      refetchQueries: () => ['getTicket', 'getAssignedTickets'],
    });
  };

  const [deleteTicket, { loading: deleteTicketLoading }] = useMutation(
    DELETE_TICKET_MUTATION,
    {
      update: () => {
        toast({
          type: 'success',
          icon: 'check',
          title: t('details.editTicket.delete.title'),
          description: t('details.editTicket.delete.description'),
          animation: 'bounce',
          time: 5000,
        });
        history.goBack();
      },
      onError(err) {
        console.error(err);
      },
    }
  );

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
      <Modal.Header data-testid="edit.ticket.modal.header">
        <React.Fragment>{t('details.editTicket.title')}</React.Fragment>
      </Modal.Header>
      <Modal.Content>
        <Form style={{ margin: '0 35px' }}>
          <Input
            style={{ marginBottom: '1rem' }}
            fluid
            label={t('details.editTicket.inputs.title.label')}
            name="title"
            type="text"
            value={values.title}
            placeholder={t('details.editTicket.inputs.title.placeholder')}
            onChange={(event) => {
              setValues((prevValues) => {
                return { ...prevValues, title: event.target.value };
              });
            }}
          />
          <Section>
            <div>
              <Header
                size="tiny"
                style={{ margin: 0, marginBottom: '0.25rem' }}
              >
                <React.Fragment>
                  {t('details.editTicket.inputs.type.label')}
                </React.Fragment>
              </Header>
              {!isTest && (
                <Dropdown
                  name="type"
                  clearable
                  options={typeOptions}
                  selection
                  value={values.type}
                  placeholder={t('details.editTicket.inputs.type.placeholder')}
                  onChange={(_, data: any) =>
                    setValues((prevValues) => {
                      return {
                        ...prevValues,
                        description: data.value
                          ? generateTemplate(
                              data.options[data.value - 1].text.toUpperCase(),
                              t,
                              i18n
                            )
                          : '',
                        type: data.value,
                      };
                    })
                  }
                />
              )}
            </div>
            <SecondInput>
              <Header
                size="tiny"
                style={{ margin: 0, marginBottom: '0.25rem' }}
              >
                <React.Fragment>
                  {t('details.editTicket.inputs.priority.label')}
                </React.Fragment>
              </Header>
              {!isTest && (
                <Dropdown
                  name="priority"
                  clearable
                  options={priorityOptions}
                  selection
                  placeholder={t(
                    'details.editTicket.inputs.priority.placeholder'
                  )}
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
              )}
            </SecondInput>
          </Section>
          <Section>
            <div>
              <Header
                size="tiny"
                style={{ margin: 0, marginBottom: '0.25rem' }}
              >
                <React.Fragment>
                  {t('details.editTicket.inputs.assignees.label')}
                </React.Fragment>
              </Header>
              {!isTest && (
                <Dropdown
                  name="assignees"
                  clearable
                  multiple
                  options={personnel}
                  value={values.assignees}
                  selection
                  placeholder={t(
                    'details.editTicket.inputs.assignees.placeholder'
                  )}
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
              )}
            </div>
            <SecondInput>
              <Header
                size="tiny"
                style={{ margin: 0, marginBottom: '0.25rem' }}
              >
                <React.Fragment>
                  {t('details.editTicket.inputs.deadline.label')}
                </React.Fragment>
              </Header>
              <SemanticDatepicker
                name="deadline"
                value={values.deadline as Date}
                onChange={(_, data) => {
                  setValues((prevValues) => {
                    return {
                      ...prevValues,
                      deadline: data.value
                        ? new Date(data.value as Date)
                        : null,
                    };
                  });
                }}
              />
            </SecondInput>
          </Section>
          <Header size="tiny" style={{ margin: 0, marginBottom: '0.25rem' }}>
            <React.Fragment>
              {t('details.editTicket.inputs.description.label')}
            </React.Fragment>
          </Header>
          <TextArea
            name="description"
            placeholder={t('details.editTicket.inputs.description.placeholder')}
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
          {t('details.editTicket.buttons.delete')}
        </Button>
        <Button
          color="blue"
          disabled={disableSave || updateTicketLoading || deleteTicketLoading}
          loading={updateTicketLoading}
          onClick={handleSumbit}
        >
          {t('details.editTicket.buttons.save')}
        </Button>
        <Button
          color="grey"
          onClick={toggleModal}
          disabled={updateTicketLoading || deleteTicketLoading}
        >
          {t('details.editTicket.buttons.close')}
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default Edit;
