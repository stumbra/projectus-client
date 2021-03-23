import styled from 'styled-components';
import { Segment } from 'semantic-ui-react';

export const Container = styled(Segment)`
  display: flex !important;
  align-items: center !important;
  flex-direction: column !important;
  margin: 1rem !important;
`;

export const ChartInfo = styled.span`
  font-size: 1.5rem;
  font-weight: 400;
  margin-bottom: 1rem;
`;
