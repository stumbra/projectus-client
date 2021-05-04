import React from 'react';
import Create from './Create';
import { fireEvent } from '@testing-library/react';
import { renderApollo, TestWrapper, cleanup } from 'src/test-utils';
import { CREATE_BOARD_SECTION_MUTATION } from './gql';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';

const setState = jest.fn();
const useStateMock: any = (initState: any) => [initState, setState];

const mocks: MockedResponse[] = [
  {
    request: {
      query: CREATE_BOARD_SECTION_MUTATION,
      variables: {
        board: '1',
        title: 'Title',
      },
    },
    result: {
      data: {
        createSection: {
          id: '1',
          title: 'Title',
        },
      },
    },
  },
];

describe('Section creation modal', () => {
  afterEach(() => {
    cleanup;
  });
  const refetchMock = jest.fn();
  const toggleModalMock = jest.fn();

  it('should render component', () => {
    jest.spyOn(React, 'useState').mockImplementation(useStateMock);
    const { getByTestId } = renderApollo(
      <MockedProvider mocks={mocks}>
        <TestWrapper>
          <Create
            isVisible
            toggleModal={toggleModalMock}
            refetch={refetchMock}
          />
        </TestWrapper>
      </MockedProvider>
    );

    expect(getByTestId('create.section.modal.header')).toBeDefined();

    fireEvent.click(getByTestId('create.section.modal.submit'));
  });
});
