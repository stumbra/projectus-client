import { Input, Table, Icon as SemanticIcon } from 'semantic-ui-react';
import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 1rem;
`;

export const SearchWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  @media (max-width: 340px) {
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

export const Icon = styled(SemanticIcon)`
  margin: 0.05rem !important;
`;

export const TableRow = styled(Table.Row)`
  ${({ priority }) =>
    priority === 'HIGH'
      ? 'background-color: rgba(255, 82, 82, 0.8);'
      : priority === 'MEDIUM'
      ? 'background-color: rgba(255, 225, 33, 0.8);'
      : priority === 'LOW'
      ? 'background-color: rgba(86, 181, 80, 0.8);'
      : 'background-color: transparent;'}
`;

export const NoAssignees = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
`;
