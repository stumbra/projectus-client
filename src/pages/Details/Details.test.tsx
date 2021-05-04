import Details from './Details';
import { renderApollo, TestWrapper, cleanup } from 'src/test-utils';
import { fireEvent } from '@testing-library/dom';
import { act } from 'react-dom/test-utils';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { GET_TICKET_INFORMATION_QUERY } from './gql';
import { createMemoryHistory } from 'history';
import { Route, MemoryRouter } from 'react-router-dom';

const mocks: MockedResponse[] = [
  {
    request: {
      query: GET_TICKET_INFORMATION_QUERY,
      variables: {
        ticket: '123',
      },
    },
    result: {
      data: {
        getTicket: {
          id: '123',
          number: 1,
          title: 'Title',
          description: 'Description',
          creator: {
            id: '1',
            name: 'John',
            surname: 'Doe',
            avatar: 'Avatar',
          },
          assignees: [
            {
              id: '2',
              name: 'Jane',
              surname: 'Doe',
              avatar: 'Avatar',
            },
          ],
          messages: [
            {
              id: '1',
              body: 'Body',
              creator: {
                id: '1',
                name: 'Jane',
                surname: 'Doe',
                avatar: 'Avatar',
              },
              createdAt: '2021-04-17T16:07:30.993Z',
            },
          ],
          history: [
            {
              id: '1',
              type: 'CREATE',
              createdAt: '2021-04-17T16:07:30.993Z',
            },
          ],
          section: {
            id: '1',
            title: 'Title',
            board: {
              project: {
                owners: [
                  {
                    id: '1',
                    name: 'John',
                    surname: 'Doe',
                    avatar: 'Avatar',
                  },
                ],
                personnel: [
                  {
                    id: '2',
                    name: 'Jane',
                    surname: 'Doe',
                    avatar: 'Avatar',
                  },
                ],
              },
            },
            priority: 'LOW',
            type: 'BUG',
            deadline: '2021-04-17T16:07:30.993Z',
            hours: 123,
            createdAt: '2021-04-17T16:07:30.993Z',
          },
        },
      },
    },
  },
];

describe('Details page', () => {
  afterEach(() => {
    cleanup;
  });

  it('should render page', async () => {
    const history = createMemoryHistory();
    history.push('/ticket/123');
    const {} = renderApollo(
      <TestWrapper>
        <MemoryRouter initialEntries={['/ticket/123']}>
          <Route path={'/ticket/:id'}>
            <MockedProvider addTypename={false} mocks={mocks}>
              <Details />
            </MockedProvider>
          </Route>
        </MemoryRouter>
      </TestWrapper>
    );
  });
});
