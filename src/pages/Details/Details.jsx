import React from 'react';
import { motion } from 'framer-motion';
import { useHistory } from 'react-router';
import { GET_TICKET_INFORMATION_QUERY, CREATE_MESSAGE_MUTATION } from './gql';
import { useMutation, useQuery } from '@apollo/client';
import {
  Button,
  Card,
  Checkbox,
  Comment,
  Dimmer,
  Feed,
  Form,
  Header,
  Loader,
  TextArea,
} from 'semantic-ui-react';
import moment from 'moment';
import { AvatarGroup } from '../../components';
import { useTranslation } from 'react-i18next';
import EditTicket from './components/EditTicket/EditTicket';
import { CommentsWrapper } from './Details.styled';

const Details = () => {
  const history = useHistory();

  const id = history.location.pathname.split('/')[2];

  const { t, i18n } = useTranslation('common');

  const [error, setError] = React.useState('');

  const [body, setBody] = React.useState('');

  const [isVisible, setVisibility] = React.useState(false);

  const { loading: getTicketLoading, data: { getTicket } = [], refetch } = useQuery(
    GET_TICKET_INFORMATION_QUERY,
    {
      variables: {
        ticket: id,
      },
      onError: (err) => {
        setError(err);
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
        <Loader size="massive">Loading...</Loader>
      </Dimmer>
    );

  return (
    <React.Fragment>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <div
          style={{
            marginTop: '1rem',
            display: 'flex',
            alignContent: 'center',
          }}
        >
          <span style={{ marginRight: '0.5rem' }}>Enable editability - </span>
          <Checkbox
            toggle
            checked={isVisible}
            onChange={() => {
              setVisibility(!isVisible);
            }}
          />
        </div>
        <div
          style={{
            display: 'flex',
            width: '100%',
            marginTop: '1rem',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ marginRight: '1rem' }}>
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                }}
              >
                <h2>
                  <span
                    style={{ marginLeft: '0.5rem', color: 'lightgrey' }}
                  >{`#${getTicket.number} `}</span>
                  {`${getTicket.title}`}
                </h2>
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                marginTop: '1rem',
                flexWrap: 'wrap',
              }}
            >
              <Button active positive>
                {getTicket.section.title}
              </Button>
              <h5 style={{ margin: 0, marginLeft: '0.5rem' }}>
                <a>
                  {getTicket.creator.name} {getTicket.creator.surname}
                </a>
                {` created this ticket ${moment(getTicket.createdAt).fromNow()}`}
              </h5>
              <h5
                style={{ margin: 0, color: 'lightgrey', marginLeft: '0.5rem' }}
              >{`${getTicket.messages.length} comments`}</h5>
            </div>

            <div
              style={{
                marginTop: '1rem',
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'flex-start',
              }}
            >
              <h4 style={{ margin: 0, marginRight: '0.5rem' }}>{`Type - ${getTicket.type}`}</h4>
              <h4
                style={{ margin: 0, marginRight: '0.5rem' }}
              >{`Priority - ${getTicket.priority}`}</h4>
              {getTicket.deadline && (
                <h4 style={{ margin: 0, marginRight: '0.5rem' }}>{`Deadline - ${moment(
                  getTicket.deadline
                ).fromNow()}`}</h4>
              )}
            </div>
            <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'baseline' }}>
              <h4 style={{ marginRight: '1rem' }}>Assignees: </h4>
              <AvatarGroup users={getTicket.assignees} max={3} />
              {getTicket.hours > 0 && (
                <h4
                  style={{ margin: 0, marginLeft: '1rem' }}
                >{`Logged time: ${getTicket.hours}`}</h4>
              )}
            </div>
            <div style={{ marginTop: '1rem' }}>
              <Header>Description</Header>
              <Form style={{ width: '90%' }}>
                <TextArea
                  style={{ minHeight: 200, overflowY: 'auto' }}
                  value={getTicket.description}
                  disabled
                />
              </Form>
            </div>
          </div>
          <CommentsWrapper>
            <Comment.Group style={{ minWidth: '500px' }}>
              <Header as="h3" dividing>
                Comments
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
                  placeholder="Type in the comment..."
                  onChange={(event) => setBody(event.target.value)}
                />
                <Button
                  content="Add Message"
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
        </div>
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
