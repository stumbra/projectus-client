import Error from './Error';
import { renderApollo, TestWrapper, cleanup } from 'src/test-utils';
import { fireEvent } from '@testing-library/dom';

describe('Error page', () => {
  afterEach(() => {
    cleanup;
  });

  it('should render page', async () => {
    const { getByTestId } = renderApollo(
      <TestWrapper>
        <Error />
      </TestWrapper>
    );

    expect(getByTestId('error.wrapper')).toBeDefined();
  });

  it('should handle on click', async () => {
    const { getByTestId } = renderApollo(
      <TestWrapper>
        <Error />
      </TestWrapper>
    );

    fireEvent.click(getByTestId('error.button'));
  });
});
