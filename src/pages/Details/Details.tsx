import React from 'react';
import { motion } from 'framer-motion';
import { useHistory } from 'react-router';
import {
  GET_TICKET_INFORMATION_QUERY,
  CREATE_MESSAGE_MUTATION,
  LOG_HOURS_MUTATION,
} from './gql';
import { useMutation, useQuery } from '@apollo/client';
import {
  Button,
  Checkbox,
  Comment as SemanticComment,
  Dimmer,
  Form,
  Header,
  Icon,
  Input,
  Loader,
  TextArea,
} from 'semantic-ui-react';
import moment from 'moment';
import { AvatarGroup, Comment, EditTicketModal } from '../../components';
import {
  MainSectionWrapper,
  TicketMeta,
  SecondaryTicketMeta,
  TypePrioDeadlineWrapper,
  AssigneesWrapper,
  AssigneesTitle,
  LoggedTimeTitle,
} from './Details.styled';
import { useTranslation } from 'react-i18next';
import {
  localizedPriority,
  localizedType,
  timeConvert,
} from '../../utils/helpers';
import { toast } from 'react-semantic-toasts';

const Details = (): React.ReactElement => {
  const history = useHistory();

  const id = history.location.pathname.split('/')[2];

  const { t } = useTranslation('common');

  const [body, setBody] = React.useState('');

  const [isVisible, setVisibility] = React.useState(false);

  const [hours, setHours] = React.useState('');

  const {
    loading: getTicketLoading,
    data: { getTicket } = [],
    refetch,
  } = useQuery(GET_TICKET_INFORMATION_QUERY, {
    variables: {
      ticket: id,
    },
    onError: (err) => {
      console.error(err);
    },
    notifyOnNetworkStatusChange: true,
  });

  const [createMessage, { loading: createMessageLoading }] = useMutation(
    CREATE_MESSAGE_MUTATION,
    {
      onError(err) {
        console.error(err);
      },
    }
  );

  const [logHours, { loading: logHoursLoading }] = useMutation(
    LOG_HOURS_MUTATION,
    {
      update: () => {
        setHours('');
        refetch();
      },
      onError(err) {
        console.error(err);
        toast({
          type: 'error',
          icon: 'close',
          title: t('details.logHours.modal.title'),
          description: t('details.logHours.modal.description'),
          animation: 'bounce',
          time: 5000,
        });
      },
    }
  );

  if (getTicketLoading || createMessageLoading) {
    return (
      <Dimmer active inverted>
        <Loader size="massive">{t('common.loading')}</Loader>
      </Dimmer>
    );
  }

  const handleLogHours = () => {
    const time = hours.toLowerCase().split(' ');

    let sum = 0;

    if (time[0].slice(-1) === 'h') {
      sum += ((time[0].split('h')[0] as unknown) as number) * 60;
    }

    if (time[0].slice(-1) === 'm') {
      sum += ((time[0].split('m')[0] as unknown) as number) * 1;
    }

    if (time[1]) {
      sum += ((time[1].split('m')[0] as unknown) as number) * 1;
    }

    if (sum === 0) {
      toast({
        type: 'error',
        icon: 'close',
        title: t('details.logHours.modal.title'),
        description: t('details.logHours.modal.description'),
        animation: 'bounce',
        time: 5000,
      });
    } else {
      logHours({
        variables: {
          ticket: getTicket.id,
          hours: sum,
        },
        refetchQueries: () => ['getAssignedTickets'],
      });
    }
  };

  return (
    <React.Fragment>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <MainSectionWrapper data-testid="details.main.section.wrapper">
          <div>
            <span>{t('details.editability')} - </span>
            <Checkbox
              toggle
              checked={isVisible}
              onChange={() => {
                setVisibility(!isVisible);
              }}
            />
          </div>
          <Input
            icon={
              <Icon
                name="hourglass"
                inverted
                circular
                link
                color="orange"
                disabled={!hours || logHoursLoading}
                onClick={handleLogHours}
                loading={logHoursLoading}
              />
            }
            value={hours}
            placeholder={t('details.logHours.placeholder')}
            onChange={(e) => {
              setHours(e.target.value);
            }}
          />
        </MainSectionWrapper>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <TicketMeta>
            <h2>
              <span>{`#${getTicket.number} `}</span>
              {`${getTicket.title}`}
            </h2>
          </TicketMeta>
        </div>
        <SecondaryTicketMeta>
          <Button active positive>
            {getTicket.section.title}
          </Button>
          <h5 style={{ color: 'black' }}>
            <a>
              {getTicket.creator.name} {getTicket.creator.surname}
            </a>
            {` ${t('details.created')} ${moment(
              getTicket.createdAt
            ).fromNow()}`}
          </h5>
          <h5>{`${getTicket.messages.length} ${t('details.messages')}`}</h5>
        </SecondaryTicketMeta>
        <TypePrioDeadlineWrapper>
          <h4>{`${t('details.meta.type')} - ${localizedType(
            getTicket.type,
            t
          )}`}</h4>
          <h4>{`${t('details.meta.priority')} - ${localizedPriority(
            getTicket.priority,
            t
          )}`}</h4>
          {getTicket.deadline && (
            <h4>{`${t('details.meta.deadline')}  - ${moment(
              getTicket.deadline
            ).fromNow()}`}</h4>
          )}
        </TypePrioDeadlineWrapper>
        {getTicket.assignees.length > 0 && (
          <AssigneesWrapper>
            <AssigneesTitle>{`${t('details.assignees')}`}: </AssigneesTitle>
            <AvatarGroup users={getTicket.assignees} max={3} />
            {getTicket.hours > 0 && (
              <LoggedTimeTitle>{`${t('details.loggedTime')}: ${timeConvert(
                getTicket.hours
              )}`}</LoggedTimeTitle>
            )}
          </AssigneesWrapper>
        )}

        <SemanticComment.Group style={{ margin: 'auto' }}>
          <Header dividing>{t('details.description')}</Header>
          <Form>
            <TextArea
              style={{ minHeight: 200, overflowY: 'auto' }}
              value={getTicket.description}
              disabled
            />
          </Form>
        </SemanticComment.Group>

        <SemanticComment.Group style={{ margin: 'auto' }}>
          <Header
            as="h3"
            dividing
            style={{ textTransform: 'capitalize', marginTop: '1rem' }}
          >
            {t('details.messages')}
          </Header>
          {getTicket.messages.map((message) => (
            <Comment key={message.id} message={message} refetch={refetch} />
          ))}
          <Form reply>
            <Form.TextArea
              value={body}
              placeholder={t('details.placeholder')}
              onChange={(event) => setBody(event.target.value)}
            />
            <Button
              content={t('details.addMessage')}
              labelPosition="left"
              icon="edit"
              primary
              disabled={!body}
              onClick={() => {
                createMessage({
                  variables: {
                    ticket: getTicket.id,
                    body,
                  },
                  refetchQueries: () => ['getTicket', 'getAssignedTickets'],
                });
                setBody('');
              }}
            />
          </Form>
        </SemanticComment.Group>
      </motion.div>
      <EditTicketModal
        refetch={refetch}
        ticket={getTicket}
        isVisible={isVisible}
        toggleModal={() => {
          setVisibility(!isVisible);
        }}
      />
    </React.Fragment>
  );
};

export default Details;
