import { useMutation, useQuery } from '@apollo/client';
import { motion } from 'framer-motion';
import React from 'react';
import { Button, Checkbox, Dimmer, Icon, Loader } from 'semantic-ui-react';
import { useHistory } from 'react-router';
import {
  GET_BOARD_INFORMATION_QUERY,
  REORGANIZE_SECTIONS_MUTATION,
  REORGANIZE_TICKETS_MUTATION,
} from './gql';
import { CREATE_BOARD_SECTION_MUTATION } from 'src/components/Modals/Section/gql';
import Error from '../Error/Error';
import { useTranslation } from 'react-i18next';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { Empty, Column, CreateSectionModal } from '../../components';
import {
  Container,
  Header,
  PrimarySection,
  BoardWrapper,
  CheckboxWrapper,
} from './Board.styled';

const Board = (): React.ReactElement => {
  const history = useHistory();

  const { t } = useTranslation('common');

  const id = history.location.pathname.split('/')[2];

  const [error, setError] = React.useState<boolean>(false);

  const [
    isSectionCreationVisible,
    setSectionCreationVisibility,
  ] = React.useState(false);

  const [isEditable, setEditability] = React.useState<boolean>(false);

  const [refetching, setRefetching] = React.useState(false);

  const [createSection] = useMutation(CREATE_BOARD_SECTION_MUTATION, {
    onError: (err) => {
      console.error(err);
    },
  });

  const {
    loading: getBoardInformationLoading,
    data: { getBoardInformation } = [],
    refetch,
  } = useQuery(GET_BOARD_INFORMATION_QUERY, {
    variables: {
      board: id,
    },
    onError: (err) => {
      console.error(err);
      setError(true);
    },
    onCompleted: () => {
      setRefetching(true);
      if (getBoardInformation.project.githubReleasesURL) {
        fetch(`${getBoardInformation.project.githubReleasesURL}/latest`)
          .then((response) => response.json())
          .then((data) => {
            const alreadyExists = getBoardInformation.sections.find(
              (section) => section.title === data.tag_name
            );
            if (!alreadyExists) {
              createSection({
                variables: {
                  board: getBoardInformation.id,
                  title: data.tag_name,
                },
              }).then(() => {
                setRefetching(false);
              });
            } else {
              setRefetching(false);
            }
          });
      } else {
        setRefetching(false);
      }
    },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
  });

  const [
    reorganizeSections,
    { loading: reorganizeSectionsLoading },
  ] = useMutation(REORGANIZE_SECTIONS_MUTATION, {
    update: () => {
      refetch();
    },
    onError(err) {
      console.error(err);
    },
  });

  const [
    reorganizeTickets,
    { loading: reorganizeTicketsLoading },
  ] = useMutation(REORGANIZE_TICKETS_MUTATION, {
    update: () => {
      refetch();
    },
    onError(err) {
      console.error(err);
    },
  });

  if (
    getBoardInformationLoading ||
    reorganizeSectionsLoading ||
    reorganizeTicketsLoading ||
    refetching
  ) {
    return (
      <Dimmer active inverted>
        <Loader size="massive">{t('common.loading')}</Loader>
      </Dimmer>
    );
  }

  const handleOnDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === 'column') {
      const newColumnOrder = getBoardInformation.sections.map(
        (section) => section.id
      );
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);
      reorganizeSections({
        variables: {
          board: getBoardInformation.id,
          sections: newColumnOrder,
        },
      });
    } else {
      const start = getBoardInformation.sections.find(
        (section) => section.id === source.droppableId
      );
      const finish = getBoardInformation.sections.find(
        (section) => section.id === destination.droppableId
      );

      if (start === finish) {
        const ids = start.tickets.map((ticket) => ticket.id);
        ids.splice(source.index, 1);
        ids.splice(destination.index, 0, draggableId);
        reorganizeTickets({
          variables: {
            section: start.id,
            tickets: ids,
          },
        });
      } else {
        const startTaskIds = start.tickets.map((ticket) => ticket.id);
        startTaskIds.splice(source.index, 1);
        reorganizeTickets({
          variables: {
            section: start.id,
            tickets: startTaskIds,
          },
        });
        const finishTaskIds = finish.tickets.map((ticket) => ticket.id);
        finishTaskIds.splice(destination.index, 0, draggableId);
        reorganizeTickets({
          variables: {
            section: finish.id,
            tickets: finishTaskIds,
          },
        });
      }
    }
  };

  const personnel = [
    ...getBoardInformation.project.owners,
    ...getBoardInformation.project.personnel,
  ].map((person, index) => {
    return {
      key: index + 1,
      text: `${person.name} ${person.surname}`,
      value: person.id,
    };
  });

  return (
    <React.Fragment>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {!error ? (
          <React.Fragment>
            <PrimarySection>
              <Header size="medium">{`${getBoardInformation.project.title} ${t(
                'header.board'
              ).toLowerCase()}`}</Header>
              <Button
                primary
                icon
                labelPosition="right"
                onClick={() => {
                  setSectionCreationVisibility(true);
                }}
                style={{ height: 'fit-content' }}
              >
                {t('board.main.button')}
                <Icon name="plus" />
              </Button>
            </PrimarySection>
            {getBoardInformation.sections.length > 0 ? (
              <BoardWrapper>
                <Container>
                  <CheckboxWrapper>
                    <span>{`${t('board.main.edit')} -`}</span>
                    <Checkbox
                      toggle
                      checked={isEditable}
                      onChange={(_, { checked }) => {
                        setEditability(checked as boolean);
                      }}
                    />
                  </CheckboxWrapper>
                  <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable
                      droppableId="all-columns"
                      direction="horizontal"
                      type="column"
                    >
                      {(provided) => (
                        <div
                          style={{ display: 'flex' }}
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                        >
                          {getBoardInformation.sections.map(
                            (section, index) => (
                              <Column
                                key={section.id}
                                column={section}
                                tasks={section.tickets}
                                index={index}
                                isEditable={isEditable}
                                refetch={refetch}
                                personnel={personnel}
                              />
                            )
                          )}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </DragDropContext>
                </Container>
              </BoardWrapper>
            ) : (
              <Empty
                header={t('board.main.empty.title')}
                subheader={t('board.main.empty.subtitle')}
              />
            )}
          </React.Fragment>
        ) : (
          <Error />
        )}
      </motion.div>
      {isSectionCreationVisible && (
        <CreateSectionModal
          refetch={refetch}
          isVisible={isSectionCreationVisible}
          toggleModal={() => {
            setSectionCreationVisibility(!isSectionCreationVisible);
          }}
        />
      )}
    </React.Fragment>
  );
};

export default Board;
