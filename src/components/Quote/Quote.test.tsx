import Quote from './Quote';
import { renderApollo, TestWrapper, cleanup } from 'src/test-utils';

describe('Quote component', () => {
  afterEach(() => {
    cleanup;
  });

  it('should quote component', () => {
    const { getByTestId } = renderApollo(
      <TestWrapper>
        <Quote text="Text" author="Author" />
      </TestWrapper>
    );

    expect(getByTestId('quote.blockquote')).toBeDefined();
  });
});
