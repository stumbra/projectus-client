import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell } from 'recharts';
import { useDimensions } from '../../utils/hooks';
import { RADIAN } from '../../utils/constants';
import { Container, ChartInfo } from './Chart.styled';

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const Chart = ({ title, data, dataKeys, type }) => {
  const { height, width } = useDimensions();

  return (
    <Container>
      {type === 'Bar' && (
        <React.Fragment>
          <ChartInfo>{title}</ChartInfo>
          <BarChart
            data={data}
            height={height / 3}
            width={width > 600 ? width / 3 : width / 1.5}
            margin={{ left: -20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={dataKeys.x} />
            <YAxis />
            <Tooltip />
            <Bar dataKey={dataKeys.y} />
          </BarChart>
        </React.Fragment>
      )}
      {type === 'Pie' && (
        <React.Fragment>
          <ChartInfo>{title}</ChartInfo>
          <PieChart height={height / 3} width={width > 600 ? width / 3 : width / 1.5}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={width > 700 ? 120 : 100}
              dataKey="amount"
            >
              {data.map((index) => (
                <Cell key={`cell-${index}`} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </React.Fragment>
      )}
    </Container>
  );
};

export default Chart;
