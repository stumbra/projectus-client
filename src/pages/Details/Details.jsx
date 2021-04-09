import React from 'react';
import { motion } from 'framer-motion';
import { useHistory } from 'react-router';
import { GET_TICKET_INFORMATION_QUERY, CREATE_MESSAGE_MUTATION } from './gql';
import { useMutation, useQuery } from '@apollo/client';
import {
  Button,
  Checkbox,
  Comment,
  Dimmer,
  Form,
  Header,
  Loader,
  TextArea,
} from 'semantic-ui-react';
import moment from 'moment';
import { AvatarGroup } from '../../components';
import EditTicket from './components/EditTicket/EditTicket';
import {
  CommentsWrapper,
  EditBox,
  Container,
  PrimaryMetaWrapper,
  TicketMeta,
  SecondaryTicketMeta,
  TypePrioDeadlineWrapper,
  AssigneesWrapper,
  AssigneesTitle,
  LoggedTimeTitle,
} from './Details.styled';
import { useTranslation } from 'react-i18next';
import { localizedPriority, localizedType } from '../../utils/helpers';

const Details = () => {
  const history = useHistory();

  const id = history.location.pathname.split('/')[2];

  const { t } = useTranslation('common');

  const [body, setBody] = React.useState('');

  const [isVisible, setVisibility] = React.useState(false);

  const { loading: getTicketLoading, data: { getTicket } = [], refetch } = useQuery(
    GET_TICKET_INFORMATION_QUERY,
    {
      variables: {
        ticket: id,
      },
      onError: (err) => {
        console.error(err);
      },
      notifyOnNetworkStatusChange: true,
    }
  );

  const [createMessage, { loading: createMessageLoading }] = useMutation(CREATE_MESSAGE_MUTATION, {
    onError(err) {
      console.error(err);
    },
  });

  if (getTicketLoading || createMessageLoading)
    return (
      <Dimmer active inverted>
        <Loader size="massive">{t('common.loading')}</Loader>
      </Dimmer>
    );

  return (
    <React.Fragment>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <EditBox>
          <span>{t('details.editability')} - </span>
          <Checkbox
            toggle
            checked={isVisible}
            onChange={() => {
              setVisibility(!isVisible);
            }}
          />
        </EditBox>
        <Container>
          <PrimaryMetaWrapper>
            <div>
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
                {` ${t('details.created')} ${moment(getTicket.createdAt).fromNow()}`}
              </h5>
              <h5>{`${getTicket.messages.length} ${t('details.messages')}`}</h5>
            </SecondaryTicketMeta>
            <TypePrioDeadlineWrapper>
              <h4>{`${t('details.meta.type')} - ${localizedType(getTicket.type, t)}`}</h4>
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
                  <LoggedTimeTitle>{`${t('details.loggedTime')}: ${
                    getTicket.hours
                  }`}</LoggedTimeTitle>
                )}
              </AssigneesWrapper>
            )}
            <div style={{ marginTop: '1rem' }}>
              <Header>{t('details.description')}</Header>
              <Form style={{ width: '90%' }}>
                <TextArea
                  style={{ minHeight: 200, overflowY: 'auto' }}
                  value={getTicket.description}
                  disabled
                />
              </Form>
            </div>
          </PrimaryMetaWrapper>
          <CommentsWrapper>
            <Comment.Group style={{ minWidth: '500px' }}>
              <Header as="h3" dividing style={{ textTransform: 'capitalize' }}>
                {t('details.messages')}
              </Header>
              {getTicket.messages.map((message) => (
                <Comment key={message.id}>
                  <Comment.Avatar src={message.creator.avatar} />
                  <Comment.Content>
                    <Comment.Author as="a">{`${message.creator.name} ${message.creator.surname}`}</Comment.Author>
                    <Comment.Metadata>
                      <div>{moment(message.createdAt).fromNow()}</div>
                    </Comment.Metadata>
                    <Comment.Text>{message.body}</Comment.Text>
                  </Comment.Content>
                </Comment>
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
                      refetchQueries: () => ['getTicket'],
                    });
                    setBody('');
                  }}
                />
              </Form>
            </Comment.Group>
          </CommentsWrapper>
        </Container>
      </motion.div>
      <EditTicket
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
