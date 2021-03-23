import React from 'react';
import { useDimensions } from '../../../utils/hooks';
import { Container, Inside, Info, EventWrapper } from './NewestEvents.styled';

const NewestEvents = ({ title, events }) => {
  const { height, width } = useDimensions();

  return (
    <Container>
      <Inside height={height / 3} width={width > 600 ? width / 3 : width / 1.5}>
        <Info>{title}</Info>
        {events.map((event, index) => (
          <EventWrapper key={index}>
            <span>{`#${event.ticket.number} - ${event.ticket.title} : ${event.body}`}</span>
          </EventWrapper>
        ))}
      </Inside>
    </Container>
  );
};

export default NewestEvents;
