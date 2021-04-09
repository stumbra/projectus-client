import { useMutation } from '@apollo/client';
import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { Button, Icon } from 'semantic-ui-react';
import Task from '../Task/Task';
import { UPDATE_SECTION_TITLE_MUTATION, DELETE_SECTION_MUTATION } from './gql';
import TicketCreation from '../TicketCreation/TicketCreation';
import {
  Container,
  TaskList,
  TitleWrapper,
  Counter,
  HeadingWrapper,
  Header,
  EditIcon,
  ButtonsWrapper,
} from './Column.styled';
import { useTranslation } from 'react-i18next';

const Column = ({ column, tasks, index, refetch, isEditable, personnel }) => {
  const [title, setTitle] = React.useState(column.title);
  const [isTicketCreationVisible, setTicketCreationVisibility] = React.useState(false);

  const { t } = useTranslation('common');

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
              <HeadingWrapper>
                <Header
                  suppressContentEditableWarning
                  contentEditable={isEditable}
                  onInput={(e) => {
                    setTitle(e.target.textContent);
                  }}
                  onBlur={(e) => {
                    setTitle(column.title);
                    e.target.textContent = column.title;
                  }}
                >
                  {column.title}
                </Header>
                {isEditable && (
                  <EditIcon
                    disabled={!title}
                    name="pencil"
                    size="small"
                    onClick={handleIconPress}
                  />
                )}
              </HeadingWrapper>
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
            <ButtonsWrapper>
              <Button.Group>
                <Button positive animated="fade" onClick={() => setTicketCreationVisibility(true)}>
                  <Button.Content hidden>{t('board.column.ticket')}</Button.Content>
                  <Button.Content visible>
                    <Icon name="add" />
                  </Button.Content>
                </Button>
                {isEditable && (
                  <React.Fragment>
                    <Button.Or text={t('board.column.or')} />
                    <Button negative animated="fade" onClick={deleteSection}>
                      <Button.Content hidden>{t('board.column.section')}</Button.Content>
                      <Button.Content visible>
                        <Icon name="trash" />
                      </Button.Content>
                    </Button>
                  </React.Fragment>
                )}
              </Button.Group>
            </ButtonsWrapper>
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
