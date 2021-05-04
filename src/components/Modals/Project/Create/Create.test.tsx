import Create from './Create';
import { fireEvent } from '@testing-library/react';
import { renderApollo, TestWrapper, cleanup } from 'src/test-utils';

describe('Project creation modal', () => {
  afterEach(() => {
    cleanup;
  });
  const toggleModalMock = jest.fn();

  it('should render component', () => {
    const { getByTestId } = renderApollo(
      <TestWrapper>
        <Create isVisible toggleModal={toggleModalMock} />
      </TestWrapper>
    );

    expect(getByTestId('create.project.modal.header')).toBeDefined();
  });

  it('should close modal', () => {
    const { getByTestId } = renderApollo(
      <TestWrapper>
        <Create isVisible toggleModal={toggleModalMock} />
      </TestWrapper>
    );

    fireEvent.click(getByTestId('create.project.modal.close'));
  });
});
