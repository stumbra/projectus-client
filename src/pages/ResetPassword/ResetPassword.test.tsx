import ResetPassword from './ResetPassword';
import { renderApollo, TestWrapper, cleanup } from 'src/test-utils';

describe('ResetPassword page', () => {
  afterEach(() => {
    cleanup;
  });

  it('should render page', async () => {
    const { getByTestId } = renderApollo(
      <TestWrapper>
        <ResetPassword />
      </TestWrapper>
    );

    expect(getByTestId('reset.password.container')).toBeDefined();
  });
});
