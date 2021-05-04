import NewestEvents from './NewestEvents';
import { renderApollo, TestWrapper, cleanup } from 'src/test-utils';

describe('Newest events component', () => {
  afterEach(() => {
    cleanup;
  });

  it('should newest events component', () => {
    const { getByTestId } = renderApollo(
      <TestWrapper>
        <NewestEvents
          title="Newest Events"
          events={[
            {
              title: 'Event',
              type: 'CREATE',
              createdAt: '2021-04-17T16:07:30.993Z',
              ticket: { id: '1', number: '1', title: 'Ticket' },
            },
            {
              title: 'Event',
              type: 'MESSAGE',
              createdAt: '2021-04-17T16:07:30.993Z',
              ticket: { id: '1', number: '1', title: 'Ticket' },
            },
            {
              title: 'Event',
              type: 'UPDATED',
              createdAt: '2021-04-17T16:07:30.993Z',
              ticket: { id: '1', number: '1', title: 'Ticket' },
            },
            {
              title: 'Event',
              type: 'DELETE_MESSAGE',
              createdAt: '2021-04-17T16:07:30.993Z',
              ticket: { id: '1', number: '1', title: 'Ticket' },
            },
            {
              title: 'Event',
              type: 'LOG_HOURS',
              createdAt: '2021-04-17T16:07:30.993Z',
              ticket: { id: '1', number: '1', title: 'Ticket' },
            },
          ]}
        />
      </TestWrapper>
    );

    expect(getByTestId('newest.events.container')).toBeDefined();
    expect(getByTestId('newest.events.create.card')).toBeDefined();
    expect(getByTestId('newest.events.message.card')).toBeDefined();
    expect(getByTestId('newest.events.updated.card')).toBeDefined();
    expect(getByTestId('newest.events.delete.message.card')).toBeDefined();
    expect(getByTestId('newest.events.log.hours.card')).toBeDefined();
  });
});
