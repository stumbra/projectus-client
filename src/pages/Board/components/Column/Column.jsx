import { useMutation } from '@apollo/client';
import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { Button, Icon } from 'semantic-ui-react';
import styled from 'styled-components';
import Task from '../Task/Task';
import { UPDATE_SECTION_TITLE_MUTATION, DELETE_SECTION_MUTATION } from './gql';
import TicketCreation from '../TicketCreation/TicketCreation';

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

const Column = ({ column, tasks, index, refetch, isEditable, personnel }) => {
  const [title, setTitle] = React.useState(column.title);
  const [isTicketCreationVisible, setTicketCreationVisibility] = React.useState(false);

  const [updateTitle] = useMutation(UPDATE_SECTION_TITLE_MUTATION, {
    update: () => {
      refetch();
    },
    onError(err) {
      console.error(err);
    },
    variables: {
      section: column.id,
      title,
    },
  });

  const [deleteSection] = useMutation(DELETE_SECTION_MUTATION, {
    update: () => {
      refetch();
    },
    onError(err) {
      console.error(err);
    },
    variables: {
      section: column.id,
    },
  });

  const handleIconPress = () => {
    if (isEditable) {
      title.trim() !== column.title.trim() && title && executeUpdate();
      return;
    }
    return;
  };

  function executeUpdate() {
    updateTitle();
  }

  return (
    <React.Fragment>
      <Draggable draggableId={column.id} index={index}>
        {(provided) => (
          <Container {...provided.draggableProps} ref={provided.innerRef}>
            <TitleWrapper {...provided.dragHandleProps}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  overflow: 'auto',
                  marginRight: '0.5rem',
                }}
              >
                <h4
                  suppressContentEditableWarning
                  contentEditable={isEditable}
                  onInput={(e) => {
                    setTitle(e.target.textContent);
                  }}
                  onBlur={(e) => {
                    setTitle(column.title);
                    e.target.textContent = column.title;
                  }}
                  style={{ marginRight: '0.5rem' }}
                >
                  {column.title}
                </h4>
                {isEditable && (
                  <Icon
                    disabled={!title}
                    name="check"
                    style={{
                      cursor: 'pointer',
                    }}
                    size="small"
                    onClick={handleIconPress}
                  />
                )}
              </div>

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
                    <Task
                      key={task.id}
                      task={task}
                      index={index}
                      onClick={(e) => {
                        e.preventDefault();
                        console.log('Veikia');
                      }}
                    />
                  ))}
                  {provided.placeholder}
                </TaskList>
              )}
            </Droppable>

            <div
              style={{
                padding: '0.5rem',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                borderTop: '1px solid lightgrey',
              }}
            >
              <Button
                positive
                compact
                icon
                labelPosition="right"
                style={{ width: 'fit-content' }}
                onClick={() => setTicketCreationVisibility(true)}
              >
                Create a Ticket
                <Icon name="ticket" />
              </Button>
              {isEditable && (
                <Button
                  negative
                  compact
                  icon
                  labelPosition="right"
                  style={{ marginTop: '0.5rem', width: 'fit-content' }}
                  onClick={deleteSection}
                >
                  Remove Section
                  <Icon name="trash" />
                </Button>
              )}
            </div>
          </Container>
        )}
      </Draggable>
      <TicketCreation
        personnel={personnel}
        isVisible={isTicketCreationVisible}
        toggleModal={() => {
          setTicketCreationVisibility(!isTicketCreationVisible);
        }}
        refetch={refetch}
        section={column.id}
      />
    </React.Fragment>
  );
};

export default Column;
