import React from 'react';
import { useDimensions } from '../../../utils/hooks';
import { Container, Inside, Info, EventWrapper } from './NewestEvents.styled';
import { useTranslation } from 'react-i18next';
import moment from 'moment';

const NewestEvents = ({ title, events }) => {
  const { height, width } = useDimensions();

  const { t, i18n } = useTranslation('common');

  moment.locale(i18n.language === 'en' ? 'en' : 'lt');

  return (
    <Container>
      <Inside height={height / 3} width={width > 600 ? width / 3 : width / 1.5}>
        <Info>{title}</Info>
        {events.map((event, index) => (
          <EventWrapper key={index}>
            {event.type === 'CREATE' && (
              <span>{`#${event.ticket.number} - ${event.ticket.title} : ${t(
                'common.names.ticket'
              ).toLowerCase()} ${t('dashboard.events.created')} ${moment(
                event.createdAt
              ).fromNow()}`}</span>
            )}
          </EventWrapper>
        ))}
      </Inside>
    </Container>
  );
};

export default NewestEvents;
