import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import Task from '../Task/Task';
// import { Container } from './Column.styled';

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgray;
  border-radius: 2px;
  width: 220px;
  background-color: white;
  display: flex;
  flex-direction: column;
  height: fit-content;
`;

const TaskList = styled.div`
  padding: 8px;
  flex-grow: 1;
  min-height: 100px;
  transition: background-color 0.2s ease;
  background-color: ${({ isDraggingOver }) =>
    isDraggingOver ? 'rgba(255, 69, 0, 0.3)' : 'inherit'};
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  border-bottom: 1px solid lightgray;
  padding: 8px;
  h4 {
    margin: 0;
  }
`;

const Counter = styled.div`
  background-color: #ebecf0;
  padding: 0.2rem 0.6rem;
  border-radius: 50%;
  span {
    font-size: 1rem;
  }
`;

const Column = ({ column, tasks, index }) => {
  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided) => (
        <Container {...provided.draggableProps} ref={provided.innerRef}>
          <TitleWrapper {...provided.dragHandleProps}>
            <h4>{column.title}</h4>
            <Counter>
              <span>{tasks.length}</span>
            </Counter>
          </TitleWrapper>
          <Droppable droppableId={column.id} type="task">
            {(provided, snapshot) => (
              <TaskList
                ref={provided.innerRef}
                {...provided.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
              >
                {tasks.map((task, index) => (
                  <Task key={task.id} task={task} index={index} />
                ))}
                {provided.placeholder}
              </TaskList>
            )}
          </Droppable>
        </Container>
      )}
    </Draggable>
  );
};

export default Column;
