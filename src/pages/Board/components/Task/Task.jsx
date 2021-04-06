import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { AvatarGroup } from '../../../../components';
import moment from 'moment';

const Container = styled.div`
  border: 1px solid lightgray;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  transition: background-color 0.2s ease;
  background-color: ${({ isDragging }) => (isDragging ? 'lightgreen' : 'white')};
`;

const Task = ({ task, index }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
          onContextMenu={(e) => {
            e.preventDefault();
            console.log('Varom');
          }}
        >
          <span
            style={{ fontSize: '10px' }}
          >{`Created by ${task.creator.name} ${task.creator.surname}`}</span>
          <div style={{ margin: '0.5rem 0', display: 'flex', flexDirection: 'column' }}>
            <span style={{ marginBottom: '0.5rem' }}>{`#${task.number} - ${task.title}`}</span>
            {task.hours > 0 && (
              <span style={{ fontSize: '12px', marginBottom: '0.25rem' }}>
                {`Logged hours - ${task.hours}`}
              </span>
            )}
            {task.deadline && (
              <span style={{ fontSize: '12px', marginBottom: '0.25rem' }}>
                {`Deadline - ${moment(task.deadline).fromNow()}`}
              </span>
            )}
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span>{task.priority}</span>
            <span>{task.type}</span>
            <AvatarGroup size="extra-tiny" disabled max={1} users={task.assignees} />
          </div>
        </Container>
      )}
    </Draggable>
  );
};

export default Task;
