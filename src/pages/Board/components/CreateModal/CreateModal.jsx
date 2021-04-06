import React from 'react';
import { useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { Button, Modal, Input } from 'semantic-ui-react';
import { useForm } from '../../../../utils/hooks';
import { CREATE_BOARD_SECTION_MUTATION } from './gql';
import { useHistory } from 'react-router';
import { GET_BOARD_INFORMATION_QUERY } from '../../gql';
import { toast } from 'react-semantic-toasts';

const CreateModal = ({ isVisible, toggleModal, refetch }) => {
  const history = useHistory();

  const id = history.location.pathname.split('/')[2];

  const { t } = useTranslation('common');

  const { onChange, onSubmit, values } = useForm(executeCreation, {
    title: '',
  });

  const [createSection, { loading }] = useMutation(CREATE_BOARD_SECTION_MUTATION, {
    update: () => {
      refetch();
      toast({
        type: 'success',
        icon: 'check',
        title: 'Success!',
        description: 'Section successfully created',
        animation: 'bounce',
        time: 5000,
      });
      values.title = '';
      toggleModal();
    },
    onError(err) {
      console.error(err);
    },
    variables: {
      board: id,
      title: values.title,
    },
  });

  function executeCreation() {
    createSection();
  }

  const disableCreate = values.title === '';

  return (
    <Modal onClose={toggleModal} open={isVisible} size="tiny">
      <Modal.Header>Section creation</Modal.Header>
      <Modal.Content>
        <Input
          fluid
          label="Title:"
          placeholder="Enter section title..."
          value={values.title}
          name="title"
          type="text"
          onChange={onChange}
        />
      </Modal.Content>
      <Modal.Actions>
        <Button
          color="blue"
          onClick={onSubmit}
          disabled={loading || disableCreate}
          loading={loading}
        >
          Create
        </Button>
        <Button color="grey" onClick={toggleModal}>
          Close
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default CreateModal;
