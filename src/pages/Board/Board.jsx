import { useQuery } from '@apollo/client';
import { motion } from 'framer-motion';
import React from 'react';
import { Button, Dimmer, Icon, Loader, Segment } from 'semantic-ui-react';
import { useHistory } from 'react-router';
import { GET_BOARD_INFORMATION_QUERY } from './gql';
import Error from '../Error/Error';
import { useTranslation } from 'react-i18next';
import { Container, Header, Wrapper, Title, Subtitle, Card } from './Board.styled';
import CreateModal from './components/CreateModal/CreateModal';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import Column from './components/Column/Column';
import data from './initialData';

const Board = () => {
  const history = useHistory();

  const { t } = useTranslation('common');

  const [initial, setInitial] = React.useState(data);

  const [error, setError] = React.useState('');

  const id = history.location.pathname.split('/')[2];

  const [isCreateModalVisible, setCreateModalVisibility] = React.useState(false);

  const { loading, data: { getBoardInformation } = [], refetch } = useQuery(
    GET_BOARD_INFORMATION_QUERY,
    {
      variables: {
        board: id,
      },
      onError: (err) => {
        setError(err.graphQLErrors[0].message);
      },
      notifyOnNetworkStatusChange: true,
    }
  );

  if (loading)
    return (
      <Dimmer active inverted>
        <Loader size="massive">{t('common.loading')}</Loader>
      </Dimmer>
    );

  const handleOnDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) return;

    if (destination.droppableId === source.droppableId && destination.index === source.index)
      return;

    if (type === 'column') {
      const newColumnOrder = Array.from(initial.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      const newState = {
        ...initial,
        columnOrder: newColumnOrder,
      };

      setInitial(newState);
    } else {
      const start = initial.columns[source.droppableId];
      const finish = initial.columns[destination.droppableId];

      if (start === finish) {
        const newTasksIds = Array.from(start.taskIds);
        newTasksIds.splice(source.index, 1);
        newTasksIds.splice(destination.index, 0, draggableId);

        const newColumn = { ...start, taskIds: newTasksIds };

        const newState = {
          ...initial,
          columns: {
            ...initial.columns,
            [newColumn.id]: newColumn,
          },
        };

        setInitial(newState);
      } else {
        const startTaskIds = Array.from(start.taskIds);
        startTaskIds.splice(source.index, 1);
        const newStart = {
          ...start,
          taskIds: startTaskIds,
        };

        const finishTaskIds = Array.from(finish.taskIds);
        finishTaskIds.splice(destination.index, 0, draggableId);
        const newFinish = {
          ...finish,
          taskIds: finishTaskIds,
        };

        const newState = {
          ...initial,
          columns: {
            ...initial.columns,
            [newStart.id]: newStart,
            [newFinish.id]: newFinish,
          },
        };
        setInitial(newState);
      }
    }
  };

  return (
    <React.Fragment>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            margin: '1rem',
            alignContent: 'baseline',
            alignItems: 'baseline',
          }}
        >
          <Header size="medium">{`${getBoardInformation.project.title} Board`}</Header>
          <Button
            primary
            icon
            labelPosition="right"
            onClick={() => {
              setCreateModalVisibility(true);
            }}
            style={{ height: 'fit-content' }}
          >
            Create a Section
            <Icon name="plus" />
          </Button>
        </div>

        <div
          style={{
            display: 'flex',
            height: '75vh',
            alignItems: 'baseline',
            margin: '1rem',
            backgroundColor: 'lightgrey',
          }}
        >
          <Container>
            <DragDropContext onDragEnd={handleOnDragEnd}>
              <Droppable droppableId="all-columns" direction="horizontal" type="column">
                {(provided) => (
                  <div
                    style={{ display: 'flex' }}
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {getBoardInformation.sections.map((section, index) => (
                      <Column
                        key={section.id}
                        column={section}
                        tasks={section.tickets}
                        index={index}
                      />
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </Container>
        </div>
      </motion.div>
      <CreateModal
        refetch={refetch}
        isVisible={isCreateModalVisible}
        toggleModal={() => {
          setCreateModalVisibility(!isCreateModalVisible);
        }}
      />
    </React.Fragment>
  );
};

export default Board;
