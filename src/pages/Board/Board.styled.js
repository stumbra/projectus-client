import styled from 'styled-components';
import { Header as SemanticHeader } from 'semantic-ui-react';

export const Container = styled.div`
  height: 100%;
  display: flex;
  overflow-y: auto;
  box-shadow: 0 1px 2px 0 rgb(34 36 38 / 15%);
  border-radius: 0.3rem;
  border: 1px solid rgba(34, 36, 38, 0.15);
  min-width: 100%;
  flex-direction: column;
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

export const PrimarySection = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1rem;
  align-items: baseline;
`;

export const BoardWrapper = styled.div`
  display: flex;
  align-items: baseline;
  margin: 1rem;
  background-color: lightgray;
`;

export const CheckboxWrapper = styled.div`
  margin: 0.5rem 1rem;
  display: flex;
  align-content: center;
  span {
    margin-right: 0.5rem;
  }
`;
