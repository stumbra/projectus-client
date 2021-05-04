import ForgotPassword from './ForgotPassword';
import { renderApollo, TestWrapper, cleanup } from 'src/test-utils';

describe('Forgot password page', () => {
  afterEach(() => {
    cleanup;
  });

  it('should render page', async () => {
    const { getByTestId } = renderApollo(
      <TestWrapper>
        <ForgotPassword />
      </TestWrapper>
    );

    expect(getByTestId('forgot.password.container')).toBeDefined();
  });
});
