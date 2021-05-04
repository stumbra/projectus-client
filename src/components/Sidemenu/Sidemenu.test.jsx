import Sidemenu from './Sidemenu';
import { renderApollo, TestWrapper, cleanup } from 'src/test-utils';

describe('Sidemenu component', () => {
  afterEach(() => {
    cleanup;
  });

  it('should sidemenu component', () => {
    const { getByTestId } = renderApollo(
      <TestWrapper>
        <Sidemenu children={<span>Component</span>} />
      </TestWrapper>
    );

    expect(getByTestId('sidemenu.inner.wrapper')).toBeDefined();
  });
});
