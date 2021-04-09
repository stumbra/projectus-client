import React from 'react';
import { Button, Dropdown, Header, Input, Modal, TextArea } from 'semantic-ui-react';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import { TICKET_CREATION_MUTATION } from './gql';
import { useMutation } from '@apollo/client';
import { toast } from 'react-semantic-toasts';
import generateTemplate from './templates';
import { Form, Section } from './TicketCreation.styled';
import { useTranslation } from 'react-i18next';
import { preparePriorityForAPI, prepareTypeForAPI } from '../../../../utils/helpers';
import { useHistory } from 'react-router';

const TicketCreation = ({ isVisible, toggleModal, personnel, refetch, section }) => {
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
        title: t('board.ticketCreation.modal.title'),
        description: t('board.ticketCreation.modal.description'),
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

    adjustedValues.type =
      i18n.language === 'lt' ? prepareTypeForAPI(adjustedValues.type) : adjustedValues.type;

    adjustedValues.priority =
      i18n.language === 'lt'
        ? preparePriorityForAPI(adjustedValues.priority)
        : adjustedValues.priority;

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
      <Modal.Header>{t('board.ticketCreation.title')}</Modal.Header>
      <Modal.Content>
        <Form>
          <Input
            fluid
            label={`${t('board.ticketCreation.form.title.label')}*`}
            placeholder={t('board.ticketCreation.form.title.placeholder')}
            name="title"
            type="text"
            value={values.title}
            onChange={(event) => {
              setValues((prevValues) => {
                return { ...prevValues, title: event.target.value };
              });
            }}
          />
          <Section>
            <div>
              <Header size="tiny">{`${t('board.ticketCreation.form.type.label')}*`}</Header>
              <Dropdown
                name="type"
                clearable
                options={typeOptions}
                selection
                placeholder={t('board.ticketCreation.form.type.placeholder')}
                onChange={(_, data) =>
                  setValues((prevValues) => {
                    return {
                      ...prevValues,
                      description: data.value
                        ? generateTemplate(data.options[data.value - 1].text.toUpperCase(), t, i18n)
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
              <Header size="tiny">{`${t('board.ticketCreation.form.priority.label')}*`}</Header>
              <Dropdown
                name="priority"
                clearable
                options={priorityOptions}
                selection
                placeholder={t('board.ticketCreation.form.priority.placeholder')}
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
          </Section>
          <Section>
            <div>
              <Header size="tiny">{t('board.ticketCreation.form.assignees.label')}</Header>
              <Dropdown
                name="assignees"
                clearable
                multiple
                options={personnel}
                selection
                placeholder={t('board.ticketCreation.form.assignees.placeholder')}
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
              <Header size="tiny">{t('board.ticketCreation.form.deadline.label')}</Header>
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
          </Section>
          <Header size="tiny">{t('board.ticketCreation.form.description.label')}</Header>
          <TextArea
            name="description"
            placeholder={t('board.ticketCreation.form.description.placeholder')}
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
          {t('projects.createModal.buttons.create')}
        </Button>
        <Button
          disabled={loading}
          color="grey"
          onClick={() => {
            resetValues();
            toggleModal();
          }}
        >
          {t('projects.createModal.buttons.close')}
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default TicketCreation;
