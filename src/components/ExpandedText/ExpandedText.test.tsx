import React from 'react';
import ExpandedText from './ExpandedText';
import { renderApollo, TestWrapper, cleanup } from 'src/test-utils';
import { fireEvent } from '@testing-library/dom';

const setState = jest.fn();
const useStateMock: any = (initState: any) => [initState, setState];

describe('ExpandedText component', () => {
  afterEach(() => {
    cleanup;
  });

  it('should expanded text component', () => {
    jest.spyOn(React, 'useState').mockImplementation(useStateMock);
    const { getByTestId } = renderApollo(
      <TestWrapper>
        <ExpandedText text="Text" />
        <div></div>
      </TestWrapper>
    );

    expect(getByTestId('expanded.text.title')).toBeDefined();
  });

  it('should handle on click action', () => {
    jest.spyOn(React, 'useState').mockImplementation(useStateMock);
    const { getByTestId } = renderApollo(
      <TestWrapper>
        <ExpandedText text="Text" />
      </TestWrapper>
    );

    fireEvent.click(getByTestId('expanded.text.button'));

    expect(setState).toHaveBeenCalledTimes(1);
  });
});
