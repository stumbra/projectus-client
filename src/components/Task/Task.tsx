import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { AvatarGroup } from 'src/components';
import moment from 'moment';
import { useHistory } from 'react-router';
import {
  Container,
  UserTag,
  DetailedWrapper,
  TaskTag,
  MetaTag,
  InnerWrapper,
  PriorityTag,
  TypeTag,
  AssigneesTag,
} from './Task.styled';
import { useTranslation } from 'react-i18next';
import {
  localizedPriority,
  localizedType,
  timeConvert,
} from 'src/utils/helpers';
import { TicketType } from 'src/types/types';

type TaskType = {
  task: TicketType;
  index: number;
};

const Task = ({ task, index }: TaskType): React.ReactElement => {
  const history = useHistory();

  const { t } = useTranslation('common');

  const handleClick = (e) => {
    e.preventDefault();
    history.push(`/ticket/${task.id}`);
  };

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <Container
          onClick={handleClick}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          <UserTag>{`${t('board.task.createdBy')} ${task.creator.name} ${
            task.creator.surname
          }`}</UserTag>
          <DetailedWrapper>
            <TaskTag>{`#${task.number} - ${task.title}`}</TaskTag>
            {task.hours > 0 && (
              <MetaTag>{`${t('board.task.loggedHours')} - ${timeConvert(
                task.hours
              )}`}</MetaTag>
            )}
            {task.deadline && (
              <MetaTag>{`${t('board.task.deadline')} - ${moment(
                task.deadline
              ).fromNow()}`}</MetaTag>
            )}
          </DetailedWrapper>
          <InnerWrapper>
            <PriorityTag>{`${t(
              'board.task.priorityLevel'
            )} - ${localizedPriority(task.priority, t)}`}</PriorityTag>
            <TypeTag>{`${t('board.task.type')} - ${localizedType(
              task.type,
              t
            )}`}</TypeTag>
            {task.assignees.length > 0 && (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <AssigneesTag>{`${t('board.task.assignees')} -`}</AssigneesTag>
                <AvatarGroup
                  size="extra-tiny"
                  disabled
                  max={1}
                  users={task.assignees}
                />
              </div>
            )}
          </InnerWrapper>
        </Container>
      )}
    </Draggable>
  );
};

export default Task;
