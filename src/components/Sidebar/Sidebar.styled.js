import { Menu } from 'semantic-ui-react';
import styled from 'styled-components';
import { Container as SemanticContainer, Grid } from 'semantic-ui-react';

export const MenuItem = styled(Menu.Item)`
  background: ${({ active }) =>
    active && 'linear-gradient(90deg, rgba(13,82,134,1) 40%, rgba(250,250,250,1) 90%)'} !important;
  color: ${({ active }) => active && 'white'} !important;
`;

export const GridColumn = styled(Grid.Column)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Container = styled(SemanticContainer)`
  display: flex;
  padding: 1rem;
  border-bottom: 1px solid #d4d4d5;
`;

export const WelcomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  width: 100%;
`;

export const WelcomeText = styled.p`
  margin: 0;
  font-weight: 400;
  font-size: 1.4rem;
  color: #21272a;
`;

export const FullnameText = styled.p`
  margin: 0;
  font-weight: 400;
  font-size: 1.8rem;
  color: #21272a;
`;
