import Register from './Register';
import { renderApollo, TestWrapper, cleanup } from 'src/test-utils';

describe('Register page', () => {
  afterEach(() => {
    cleanup;
  });

  it('should render page', async () => {
    const { getByTestId } = renderApollo(
      <TestWrapper>
        <Register />
      </TestWrapper>
    );

    expect(getByTestId('register.container')).toBeDefined();
  });
});
