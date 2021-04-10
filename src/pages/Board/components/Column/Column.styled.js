import { Button, Icon } from 'semantic-ui-react';
import styled from 'styled-components';

export const Container = styled.div`
  margin: 0.5rem;
  border: 1px solid lightgray;
  border-radius: 2px;
  min-width: 13.75rem;
  background-color: white;
  display: flex;
  flex-direction: column;
  height: fit-content;
`;

export const TaskList = styled.div`
  padding: 0.5rem;
  flex-grow: 1;
  min-height: 6.25rem;
  transition: background-color 0.2s ease;
  background-color: ${({ isDraggingOver }) =>
    isDraggingOver ? 'rgba(255, 69, 0, 0.3)' : 'inherit'};
`;

export const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  border-bottom: 1px solid lightgray;
  padding: 0.5rem;
  h4 {
    margin: 0;
  }
`;

export const Counter = styled.div`
  background-color: #ebecf0;
  padding: 0.2rem 0.6rem;
  border-radius: 50%;
  span {
    font-size: 1rem;
  }
`;

export const HeadingWrapper = styled.div`
  display: flex;
  align-items: baseline;
  overflow: auto;
  margin-right: 0.5rem;
`;

export const Header = styled.div`
  margin-right: 0.5rem;
`;

export const EditIcon = styled(Icon)`
  cursor: pointer;
`;

export const ButtonsWrapper = styled.div`
  padding: 0.5rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  border-top: 1px solid lightgray;
`;

export const CreateButton = styled(Button)`
  width: fit-content;
`;

export const RemoveButton = styled(Button)`
  margin-top: 0.5rem;
  width: fit-content;
`;
