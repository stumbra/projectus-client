import Landing from './Landing';
import { renderApollo, TestWrapper, cleanup } from 'src/test-utils';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { LOGIN_USER_MUTATION } from './gql';
import { act } from 'react-dom/test-utils';

const mocks: MockedResponse[] = [
  {
    request: {
      query: LOGIN_USER_MUTATION,
      variables: {
        email: 'johndoe@example.com',
        password: 'Example123',
      },
    },
  },
];

describe('Landing page', () => {
  afterEach(() => {
    cleanup;
  });

  it('should render page', async () => {
    const { getByTestId } = renderApollo(
      <TestWrapper>
        <Landing />
      </TestWrapper>
    );

    expect(getByTestId('landing.container')).toBeDefined();
  });

  it('should login user', async () => {
    const { getByTestId } = renderApollo(
      <TestWrapper>
        <MockedProvider mocks={mocks}>
          <Landing />
        </MockedProvider>
      </TestWrapper>
    );

    await act(
      async () => await new Promise((resolve) => setTimeout(resolve, 0))
    );

    expect(getByTestId('landing.container')).toBeDefined();
  });
});
