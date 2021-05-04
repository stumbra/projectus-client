import Header from './Header';
import { renderApollo, TestWrapper, cleanup } from 'src/test-utils';

describe('Header component', () => {
  afterEach(() => {
    cleanup;
  });

  it('should header component', () => {
    const { getByTestId } = renderApollo(
      <TestWrapper>
        <Header />
      </TestWrapper>
    );

    expect(getByTestId('header.wrapper')).toBeDefined();
  });
});
