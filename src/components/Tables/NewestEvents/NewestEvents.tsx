import React from 'react';
import { useDimensions } from 'src/utils/hooks';
import { Container, Inside, Info, EventWrapper } from './NewestEvents.styled';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { useHistory } from 'react-router';
import { Card, Feed } from 'semantic-ui-react';
import { EventType } from 'src/types/types';

type NewestEventsProps = {
  title: string;
  events: EventType[];
};

const NewestEvents = ({
  title,
  events,
}: NewestEventsProps): React.ReactElement => {
  const { height, width } = useDimensions();

  const { t, i18n } = useTranslation('common');

  const history = useHistory();

  moment.locale(i18n.language === 'en' ? 'en' : 'lt');

  events.sort((lhs, rhs) => {
    return lhs.createdAt > rhs.createdAt
      ? -1
      : lhs.createdAt < rhs.createdAt
      ? 1
      : 0;
  });

  return (
    <Container data-testid="newest.events.container">
      <Inside height={height / 3} width={width > 600 ? width / 3 : width / 1.5}>
        <Info>{title}</Info>
        {events.map((event, index) => (
          <EventWrapper key={index}>
            {event.type === 'CREATE' && (
              <Card
                style={{ width: '100%' }}
                data-testid="newest.events.create.card"
              >
                <Card.Content>
                  <Feed>
                    <Feed.Event>
                      <Feed.Content>
                        <Feed.Date
                          content={moment(event.createdAt).fromNow()}
                        />
                        <Feed.Summary>
                          {`#${event.ticket.number} - `}
                          <a
                            onClick={() => {
                              history.push(`/ticket/${event.ticket.id}`);
                            }}
                          >
                            {event.ticket.title}
                          </a>
                          {` ${t('dashboard.events.created')}`}
                        </Feed.Summary>
                      </Feed.Content>
                    </Feed.Event>
                  </Feed>
                </Card.Content>
              </Card>
            )}
            {event.type === 'MESSAGE' && (
              <Card
                style={{ width: '100%' }}
                data-testid="newest.events.message.card"
              >
                <Card.Content>
                  <Feed>
                    <Feed.Event>
                      <Feed.Content>
                        <Feed.Date
                          content={moment(event.createdAt).fromNow()}
                        />
                        <Feed.Summary>
                          {`#${event.ticket.number} - `}
                          <a
                            onClick={() => {
                              history.push(`/ticket/${event.ticket.id}`);
                            }}
                          >
                            {event.ticket.title}
                          </a>
                          {` ${t('dashboard.events.newMessage')}`}
                        </Feed.Summary>
                      </Feed.Content>
                    </Feed.Event>
                  </Feed>
                </Card.Content>
              </Card>
            )}
            {event.type === 'UPDATED' && (
              <Card
                style={{ width: '100%' }}
                data-testid="newest.events.updated.card"
              >
                <Card.Content>
                  <Feed>
                    <Feed.Event>
                      <Feed.Content>
                        <Feed.Date
                          content={moment(event.createdAt).fromNow()}
                        />
                        <Feed.Summary>
                          {`#${event.ticket.number} - `}
                          <a
                            onClick={() => {
                              history.push(`/ticket/${event.ticket.id}`);
                            }}
                          >
                            {event.ticket.title}
                          </a>
                          {` ${t('dashboard.events.updated')}`}
                        </Feed.Summary>
                      </Feed.Content>
                    </Feed.Event>
                  </Feed>
                </Card.Content>
              </Card>
            )}
            {event.type === 'DELETE_MESSAGE' && (
              <Card
                style={{ width: '100%' }}
                data-testid="newest.events.delete.message.card"
              >
                <Card.Content>
                  <Feed>
                    <Feed.Event>
                      <Feed.Content>
                        <Feed.Date
                          content={moment(event.createdAt).fromNow()}
                        />
                        <Feed.Summary>
                          {`#${event.ticket.number} - `}
                          <a
                            onClick={() => {
                              history.push(`/ticket/${event.ticket.id}`);
                            }}
                          >
                            {event.ticket.title}
                          </a>
                          {` ${t('dashboard.events.deletedMessage')}`}
                        </Feed.Summary>
                      </Feed.Content>
                    </Feed.Event>
                  </Feed>
                </Card.Content>
              </Card>
            )}
            {event.type === 'LOG_HOURS' && (
              <Card
                style={{ width: '100%' }}
                data-testid="newest.events.log.hours.card"
              >
                <Card.Content>
                  <Feed>
                    <Feed.Event>
                      <Feed.Content>
                        <Feed.Date
                          content={moment(event.createdAt).fromNow()}
                        />
                        <Feed.Summary>
                          {`#${event.ticket.number} - `}
                          <a
                            onClick={() => {
                              history.push(`/ticket/${event.ticket.id}`);
                            }}
                          >
                            {event.ticket.title}
                          </a>
                          {` ${t('dashboard.events.loggedHours')}`}
                        </Feed.Summary>
                      </Feed.Content>
                    </Feed.Event>
                  </Feed>
                </Card.Content>
              </Card>
            )}
          </EventWrapper>
        ))}
      </Inside>
    </Container>
  );
};

export default NewestEvents;
