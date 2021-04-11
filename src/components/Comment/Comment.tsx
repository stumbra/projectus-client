import React from 'react';
import { Comment as SemanticComment, Icon } from 'semantic-ui-react';
import moment from 'moment';
import { AuthContext } from 'src/context/auth';
import { useMutation } from '@apollo/client';
import { UPDATE_MESSAGE_MUTATION, DELETE_MESSAGE_MUTATION } from './gql';
import { MessageType } from 'src/types/types';

type CommentType = {
  message: MessageType;
  refetch: () => void;
};

const Comment = ({ message, refetch }: CommentType): React.ReactElement => {
  const { user } = React.useContext(AuthContext);

  const [isEditable, setEditability] = React.useState(false);

  const [body, setBody] = React.useState(message.body);

  const [updateMessage] = useMutation(UPDATE_MESSAGE_MUTATION, {
    onError(err) {
      console.error(err);
    },
  });

  const [deleteMessage] = useMutation(DELETE_MESSAGE_MUTATION, {
    update: () => {
      refetch();
    },
    onError(err) {
      console.error(err);
    },
  });

  const handleEdit = () => {
    updateMessage({
      variables: {
        message: message.id,
        body,
      },
    });
    setEditability(false);
  };

  const handleRemove = () => {
    deleteMessage({
      variables: {
        message: message.id,
      },
    });
    setEditability(false);
  };

  return (
    <SemanticComment>
      <SemanticComment.Avatar src={message.creator.avatar} />
      <SemanticComment.Content>
        <SemanticComment.Author as="a">{`${message.creator.name} ${message.creator.surname}`}</SemanticComment.Author>
        <SemanticComment.Metadata>
          <div>{moment(message.createdAt).fromNow()}</div>
          {user.id === message.creator.id && (
            <React.Fragment>
              <Icon
                disabled={!body}
                color={isEditable ? 'green' : 'grey'}
                name={isEditable ? 'check' : 'pencil'}
                onClick={
                  isEditable
                    ? handleEdit
                    : () => {
                        setEditability(true);
                      }
                }
              />
              {isEditable && (
                <Icon color="red" name="trash" onClick={handleRemove} />
              )}
            </React.Fragment>
          )}
        </SemanticComment.Metadata>
        <SemanticComment.Text
          style={{ minWidth: 460, maxWidth: 460 }}
          suppressContentEditableWarning
          contentEditable={user.id === message.creator.id && isEditable}
          onInput={(e) => {
            setBody(e.target.textContent);
          }}
        >
          {message.body}
        </SemanticComment.Text>
      </SemanticComment.Content>
    </SemanticComment>
  );
};

export default Comment;
