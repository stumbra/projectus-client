import React from 'react';
import Edit from './Edit';
import { fireEvent } from '@testing-library/react';
import { renderApollo, TestWrapper, cleanup } from 'src/test-utils';

const setState = jest.fn();
const useStateMock: any = (initState: any) => [initState, setState];

const ticket = {
  id: '1',
  number: 1,
  title: 'Ticket title',
  description: 'Ticket description',
  creator: {
    id: '1',
    name: 'John',
    surname: 'Doe',
  },
  assignees: [
    {
      id: '2',
      name: 'Jane',
      surname: 'Doe',
      avatar: 'https://react.semantic-ui.com/images/avatar/large/steve.jpg',
    },
  ],
  priority: 'LOW',
  type: 'BUG',
  deadline: '2021-04-17T16:07:30.993Z',
  hours: 12,
  createdAt: '2021-04-12T16:07:30.993Z',
  section: {
    id: '1',
    title: 'Backlog',
    board: {
      project: {
        id: '1',
        title: 'Project',
        description: 'Project description',
        personnel: [
          {
            id: '2',
            name: 'Jane',
            surname: 'Doe',
            avatar:
              'https://react.semantic-ui.com/images/avatar/large/steve.jpg',
          },
        ],
        owners: [
          {
            id: '1',
            name: 'John',
            surname: 'Doe',
          },
        ],
      },
    },
  },
};

describe('Ticket edit modal', () => {
  afterEach(() => {
    cleanup;
  });
  const refetchMock = jest.fn();
  const toggleModalMock = jest.fn();

  it('should render component', () => {
    jest.spyOn(React, 'useState').mockImplementation(useStateMock);
    const { getByTestId } = renderApollo(
      <TestWrapper>
        <Edit
          isVisible
          toggleModal={toggleModalMock}
          refetch={refetchMock}
          ticket={ticket}
          isTest
        />
      </TestWrapper>
    );

    expect(getByTestId('edit.ticket.modal.header')).toBeDefined();
  });
});
