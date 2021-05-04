import React from 'react';
import Comment from './Comment';
import { fireEvent } from '@testing-library/react';
import { renderApollo, TestWrapper, cleanup } from 'src/test-utils';

const setState = jest.fn();
const useStateMock: any = (initState: any) => [initState, setState];

const message = {
  id: '1',
  creator: {
    id: '1',
    name: 'John',
    surname: 'Doe',
    avatar: 'https://react.semantic-ui.com/images/avatar/large/steve.jpg',
    confirmed: true,
    email: 'johndoe@example.com',
  },
  createdAt: '2021-04-17T16:07:30.993Z',
  body: 'Body text',
};

describe('Comment component', () => {
  afterEach(() => {
    cleanup;
  });

  it('should comment component', () => {
    jest.spyOn(React, 'useState').mockImplementation(useStateMock);
    const { getByTestId } = renderApollo(
      <TestWrapper>
        <Comment message={message} refetch={() => {}} />
      </TestWrapper>
    );
    expect(getByTestId('message.1')).toBeDefined();
  });

  it('should render editable message', () => {
    jest.spyOn(React, 'useState').mockImplementation(useStateMock);
    const { getByTestId } = renderApollo(
      <TestWrapper>
        <Comment message={message} refetch={() => {}} isTest />
      </TestWrapper>
    );

    const button = getByTestId('message.edit.icon.button.1');

    fireEvent.click(button);

    expect(setState).toHaveBeenCalledTimes(1);
  });
});
