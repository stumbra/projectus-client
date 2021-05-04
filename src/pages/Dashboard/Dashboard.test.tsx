import React from 'react';
import Dashboard from './Dashboard';
import { renderApollo, TestWrapper, cleanup } from 'src/test-utils';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { GET_ASSIGNED_TICKETS_QUERY } from './gql';
import { act } from 'react-dom/test-utils';
import { fireEvent, waitFor } from '@testing-library/dom';

const setState = jest.fn();
const useStateMock: any = (initState: any) => [initState, setState];

const mocks: MockedResponse[] = [
  {
    request: {
      query: GET_ASSIGNED_TICKETS_QUERY,
    },
    result: {
      data: {
        getAssignedTickets: [
          {
            priority: 'NONE',
            type: 'BUG',
            section: {
              title: 'Backlog',
            },
            deadline: '2021-04-17T16:07:30.993Z',
            history: {
              ticket: {
                id: '1',
                number: 1,
                title: 'Title',
              },
              type: 'BUG',
              createdAt: '2021-04-17T16:07:30.993Z',
            },
          },
          {
            priority: 'LOW',
            type: 'FEATURE',
            section: {
              title: 'Backlog',
            },
            deadline: '2021-04-17T16:07:30.993Z',
            history: {
              ticket: {
                id: '2',
                number: 2,
                title: 'Title',
              },
              type: 'FEATURE',
              createdAt: '2021-04-17T16:07:30.993Z',
            },
          },
          {
            priority: 'MEDIUM',
            type: 'IMPROVEMENT',
            section: {
              title: 'Backlog',
            },
            deadline: '2021-04-17T16:07:30.993Z',
            history: {
              ticket: {
                id: '3',
                number: 3,
                title: 'Title',
              },
              type: 'IMPROVEMENT',
              createdAt: '2021-04-17T16:07:30.993Z',
            },
          },
          {
            priority: 'HIGH',
            type: 'MAINTENANCE',
            section: {
              title: 'Backlog',
            },
            deadline: '2021-04-17T16:07:30.993Z',
            history: {
              ticket: {
                id: '4',
                number: 4,
                title: 'Title',
              },
              type: 'MAINTENANCE',
              createdAt: '2021-04-17T16:07:30.993Z',
            },
          },
          {
            priority: 'NONE',
            type: 'REQUEST',
            section: {
              title: 'Backlog',
            },
            deadline: '2021-04-17T16:07:30.993Z',
            history: {
              ticket: {
                id: '5',
                number: 5,
                title: 'Title',
              },
              type: 'REQUEST',
              createdAt: '2021-04-17T16:07:30.993Z',
            },
          },
          {
            priority: 'LOW',
            type: 'SERVICE',
            section: {
              title: 'Backlog',
            },
            deadline: '2021-04-17T16:07:30.993Z',
            history: {
              ticket: {
                id: '6',
                number: 6,
                title: 'Title',
              },
              type: 'SERVICE',
              createdAt: '2021-04-17T16:07:30.993Z',
            },
          },
        ],
      },
    },
  },
];

const noMocks: MockedResponse[] = [
  {
    request: {
      query: GET_ASSIGNED_TICKETS_QUERY,
    },
    result: {
      data: {
        getAssignedTickets: [],
      },
    },
  },
];

describe('Dashboard page', () => {
  afterEach(() => {
    cleanup;
  });

  it('should render component w/ tickets', async () => {
    jest.spyOn(React, 'useState').mockImplementation(useStateMock);
    const { getByTestId } = renderApollo(
      <TestWrapper>
        <MockedProvider
          mocks={mocks}
          addTypename={false}
          defaultOptions={{ watchQuery: { fetchPolicy: 'no-cache' } }}
        >
          <Dashboard />
        </MockedProvider>
      </TestWrapper>
    );

    await act(
      async () => await new Promise((resolve) => setTimeout(resolve, 0))
    );

    fireEvent.click(getByTestId('dashboard.switcher.section.tomorrow'));
    expect(setState).toHaveBeenLastCalledWith('tomorrow');

    fireEvent.click(getByTestId('dashboard.switcher.section.thisWeek'));
    expect(setState).toHaveBeenLastCalledWith('week');

    fireEvent.click(getByTestId('dashboard.switcher.section.thisMonth'));
    expect(setState).toHaveBeenLastCalledWith('month');
  });

  it('should render component without tickets', async () => {
    jest.spyOn(React, 'useState').mockImplementation(useStateMock);
    const {} = renderApollo(
      <TestWrapper>
        <MockedProvider
          mocks={noMocks}
          addTypename={false}
          defaultOptions={{ watchQuery: { fetchPolicy: 'no-cache' } }}
        >
          <Dashboard />
        </MockedProvider>
      </TestWrapper>
    );

    await act(
      async () => await new Promise((resolve) => setTimeout(resolve, 0))
    );
  });
});
