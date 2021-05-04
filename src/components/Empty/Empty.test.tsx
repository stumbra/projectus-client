import Empty from './Empty';
import { renderApollo, TestWrapper, cleanup } from 'src/test-utils';

describe('Empty component', () => {
  afterEach(() => {
    cleanup;
  });

  it('should empty component', () => {
    const { getByTestId } = renderApollo(
      <TestWrapper>
        <Empty header="Header" subheader="Subheader" />
      </TestWrapper>
    );

    expect(getByTestId('empty.container')).toBeDefined();
  });
});
