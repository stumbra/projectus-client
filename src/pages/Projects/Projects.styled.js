import { Input, Table, Icon as SemanticIcon, Button as SemanticButton } from 'semantic-ui-react';
import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 1rem;
`;

export const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: 500px) {
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
`;

export const SearchInput = styled(Input)`
  @media (max-width: 500px) {
    margin-top: 1rem;
  }
`;

export const TableHeader = styled(Table.Header)`
  @media (max-width: 767px) {
    display: none !important;
  }
`;

export const ResponsiveCell = styled(Table.Cell)`
  @media (max-width: 767px) {
    text-align: center !important;
  }
`;

export const Icon = styled(SemanticIcon)`
  margin: 0.05rem !important;
`;

export const ActionsWrapper = styled(Table.Cell)`
  @media (max-width: 1133px) {
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
  }
`;

export const Button = styled(SemanticButton)`
  margin: 0.25rem !important;
  @media only screen and (min-device-width: 767px) and (max-device-width: 1133px) {
    width: 50% !important;
  }
`;

export const PersonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: space-between;
`;
