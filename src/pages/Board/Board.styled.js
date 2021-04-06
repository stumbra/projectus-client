import styled from 'styled-components';
import { Header as SemanticHeader } from 'semantic-ui-react';

export const Container = styled.div`
  height: 100%;
  display: flex;
  overflow-x: auto;
  box-shadow: 0 1px 2px 0 rgb(34 36 38 / 15%);
  border-radius: 0.3rem;
  border: 1px solid rgba(34, 36, 38, 0.15);
  min-width: 100%;
`;

export const Wrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
`;

export const Header = styled(SemanticHeader)`
  text-align: center;
  margin-top: 1rem !important;
`;

export const Title = styled.span`
  font-size: 1.8rem;
  font-weight: 400;
  color: #21272a;
  margin-bottom: 1rem;
`;

export const Subtitle = styled.span`
  font-size: 1.4rem;
  font-weight: 400;
  color: #21272a;
  width: 48.563rem;
  width: 100%;
`;
