import React from 'react';
import { fireEvent } from '@testing-library/react';
import { renderApollo, TestWrapper, cleanup } from 'src/test-utils';
import Chart from './Chart';
import { COLORS } from 'src/utils/constants';

describe('Chart component', () => {
  afterEach(() => {
    cleanup;
  });

  it('should render bar chart', () => {
    const { getByTestId } = renderApollo(
      <TestWrapper>
        <Chart
          title="Bar chart"
          type="Bar"
          data={[{ name: 'Test', amount: 0, fill: COLORS[0] }]}
        />
      </TestWrapper>
    );
    expect(getByTestId('chart.bar.title')).toBeDefined();
  });

  it('should render pie chart', () => {
    const { getByTestId } = renderApollo(
      <TestWrapper>
        <Chart
          title="Pie chart"
          type="Pie"
          data={[{ name: 'Test', amount: 0, fill: COLORS[0] }]}
        />
      </TestWrapper>
    );
    expect(getByTestId('chart.pie.title')).toBeDefined();
  });
});
