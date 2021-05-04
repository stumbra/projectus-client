import ConfirmEmail from './ConfirmEmail';
import { renderApollo, TestWrapper, cleanup } from 'src/test-utils';
import { fireEvent } from '@testing-library/dom';
import { act } from 'react-dom/test-utils';

describe('Confirm email page', () => {
  afterEach(() => {
    cleanup;
  });

  it('should render page', async () => {
    const { getByTestId } = renderApollo(
      <TestWrapper>
        <ConfirmEmail />
      </TestWrapper>
    );

    expect(getByTestId('confirm.email.wrapper')).toBeDefined();
  });

  it('should handle on click', async () => {
    const { getByTestId } = renderApollo(
      <TestWrapper>
        <ConfirmEmail />
      </TestWrapper>
    );

    await act(
      async () => await new Promise((resolve) => setTimeout(resolve, 0))
    );

    fireEvent.click(getByTestId('confirm.email.button'));
  });
});
