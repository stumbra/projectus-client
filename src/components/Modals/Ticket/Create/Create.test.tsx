import React from 'react';
import Create from './Create';
import { fireEvent } from '@testing-library/react';
import { renderApollo, TestWrapper, cleanup } from 'src/test-utils';

const setState = jest.fn();
const useStateMock: any = (initState: any) => [initState, setState];

const personnel = [
  {
    key: 1,
    text: 'John Doe',
    value: 0,
  },
  {
    key: 2,
    text: 'Jane Doe',
    value: 1,
  },
];

describe('Ticket creation modal', () => {
  afterEach(() => {
    cleanup;
  });
  const refetchMock = jest.fn();
  const toggleModalMock = jest.fn();

  it('should render component', () => {
    jest.spyOn(React, 'useState').mockImplementation(useStateMock);
    const { getByTestId } = renderApollo(
      <TestWrapper>
        <Create
          isVisible
          toggleModal={toggleModalMock}
          refetch={refetchMock}
          section="Backlog"
          isTest
          personnel={personnel}
        />
      </TestWrapper>
    );

    expect(getByTestId('create.ticket.modal.header')).toBeDefined();
  });

  it('should close modal', () => {
    jest.spyOn(React, 'useState').mockImplementation(useStateMock);
    const { getByTestId } = renderApollo(
      <TestWrapper>
        <Create
          isVisible
          toggleModal={toggleModalMock}
          refetch={refetchMock}
          section="Backlog"
          isTest
          personnel={personnel}
        />
      </TestWrapper>
    );

    fireEvent.click(getByTestId('create.ticket.modal.close'));
  });
});
