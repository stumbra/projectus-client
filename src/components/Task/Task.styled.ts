import styled, { css } from 'styled-components';

export const Container = styled.div`
  border: 1px solid lightgray;
  border-radius: 2px;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  transition: background-color 0.2s ease;
  background-color: ${({ isDragging }) =>
    isDragging ? 'rgb(32,133,208)' : 'white'};
  color: ${({ isDragging }) => (isDragging ? 'white' : 'black')};
`;

export const UserTag = styled.span`
  font-size: 0.625rem;
`;

export const DetailedWrapper = styled.div`
  margin: 0.1rem 0;
  display: flex;
  flex-direction: column;
`;

export const TaskTag = styled.span`
  margin-bottom: 0.25rem;
`;

export const MetaTag = styled.span`
  font-size: 0.8rem;
  margin-bottom: 0.1rem;
`;

export const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const LocalizedDataStyles = css`
  font-size: 0.8rem;
  margin-bottom: 0.1rem;
  text-transform: capitalize;
`;

export const PriorityTag = styled.span`
  ${LocalizedDataStyles}
`;

export const TypeTag = styled.span`
  ${LocalizedDataStyles}
`;

export const AssigneesTag = styled.span`
  ${LocalizedDataStyles}
  margin-right: 0.1rem;
`;
