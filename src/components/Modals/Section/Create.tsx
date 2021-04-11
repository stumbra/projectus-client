import React from 'react';
import { useMutation } from '@apollo/client';
import { Button, Modal, Input } from 'semantic-ui-react';
import { useForm } from 'src/utils/hooks';
import { CREATE_BOARD_SECTION_MUTATION } from './gql';
import { useHistory } from 'react-router';
import { toast } from 'react-semantic-toasts';
import { useTranslation } from 'react-i18next';

type CreateProps = {
  isVisible: boolean;
  toggleModal: () => void;
  refetch: () => void;
};

const Create = ({
  isVisible,
  toggleModal,
  refetch,
}: CreateProps): React.ReactElement => {
  const history = useHistory();

  const id = history.location.pathname.split('/')[2];

  const { t } = useTranslation('common');

  const { onChange, onSubmit, values } = useForm(executeCreation, {
    title: '',
  });

  let { title } = values as { title: string };

  const [createSection, { loading }] = useMutation(
    CREATE_BOARD_SECTION_MUTATION,
    {
      update: () => {
        refetch();
        toast({
          type: 'success',
          icon: 'check',
          title: t('board.sectionCreation.modal.title'),
          description: t('board.sectionCreation.modal.description'),
          animation: 'bounce',
          time: 5000,
        });
        title = '';
        toggleModal();
      },
      onError(err) {
        console.error(err);
      },
      variables: {
        board: id,
        title,
      },
    }
  );

  function executeCreation() {
    createSection();
  }

  const disableCreate = title === '';

  return (
    <Modal onClose={toggleModal} open={isVisible} size="mini">
      <Modal.Header>{t('board.sectionCreation.title')}</Modal.Header>
      <Modal.Content>
        <Input
          fluid
          label={`${t('board.sectionCreation.input')}`}
          placeholder={t('board.sectionCreation.placeholder')}
          value={title}
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
          {t('projects.createModal.buttons.create')}
        </Button>
        <Button color="grey" onClick={toggleModal}>
          {t('projects.createModal.buttons.close')}
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default Create;
