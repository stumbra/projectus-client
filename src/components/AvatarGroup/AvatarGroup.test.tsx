import React from 'react';
import AvatarGroup from './AvatarGroup';
import { fireEvent } from '@testing-library/react';
import { renderApollo, TestWrapper, cleanup } from 'src/test-utils';

const setState = jest.fn();
const useStateMock: any = (initState: any) => [initState, setState];

const users = [
  {
    name: 'John',
    surname: 'Doe',
    avatar: 'https://react.semantic-ui.com/images/avatar/large/steve.jpg',
  },
  {
    name: 'Jane',
    surname: 'Doe',
    avatar: 'https://react.semantic-ui.com/images/avatar/large/bill.jpg',
  },
];

describe('Avatar Group component', () => {
  afterEach(() => {
    cleanup;
  });

  it('should render avatar group component', () => {
    jest.spyOn(React, 'useState').mockImplementation(useStateMock);
    const { getByTestId } = renderApollo(
      <TestWrapper>
        <AvatarGroup users={users} max={1} />
      </TestWrapper>
    );
    expect(getByTestId('avatar.group')).toBeDefined();
    expect(getByTestId('avatar.group.overmax.1')).toBeDefined();

    const button = getByTestId('avatar.group.overmax.1');

    fireEvent.click(button);
    expect(setState).toHaveBeenCalledTimes(1);
  });
});
