import ConfirmInvitation from './ConfirmInvitation';
import { renderApollo, TestWrapper, cleanup } from 'src/test-utils';
import { fireEvent } from '@testing-library/dom';
import { act } from 'react-dom/test-utils';

describe('Confirm invitation page', () => {
  afterEach(() => {
    cleanup;
  });

  it('should render page', async () => {
    const { getByTestId } = renderApollo(
      <TestWrapper>
        <ConfirmInvitation />
      </TestWrapper>
    );

    expect(getByTestId('confirm.invitation.wrapper')).toBeDefined();
  });

  it('should handle on click', async () => {
    const { getByTestId } = renderApollo(
      <TestWrapper>
        <ConfirmInvitation />
      </TestWrapper>
    );

    await act(
      async () => await new Promise((resolve) => setTimeout(resolve, 0))
    );

    fireEvent.click(getByTestId('confirm.invitation.button'));
  });
});
