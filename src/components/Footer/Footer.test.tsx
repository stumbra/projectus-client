import Footer from './Footer';
import { renderApollo, TestWrapper, cleanup } from 'src/test-utils';

describe('Footer component', () => {
  afterEach(() => {
    cleanup;
  });

  it('should footer component', () => {
    const { getByTestId } = renderApollo(
      <TestWrapper>
        <Footer />
      </TestWrapper>
    );

    expect(getByTestId('footer')).toBeDefined();
  });
});
