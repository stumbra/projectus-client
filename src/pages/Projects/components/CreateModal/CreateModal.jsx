import { useMutation } from '@apollo/client';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Modal, Header, Form, TextArea, Input } from 'semantic-ui-react';
import { useForm } from '../../../../utils/hooks';
import { toast } from 'react-semantic-toasts';
import { CREATE_PROJECT_MUTATION } from './gql';
import { GET_ASSIGNED_PROJECTS_QUERY } from '../../gql';

const CreateModal = ({ isVisible, toggleModal }) => {
  const { t } = useTranslation('common');

  const { onChange, onSubmit, values } = useForm(executeCreation, {
    title: '',
    description: '',
  });

  const [createProject, { loading }] = useMutation(CREATE_PROJECT_MUTATION, {
    update: (cache, { data }) => {
      const existingProjects = cache.readQuery({ query: GET_ASSIGNED_PROJECTS_QUERY });
      cache.writeQuery({
        query: GET_ASSIGNED_PROJECTS_QUERY,
        data: {
          getAssignedProjects: [...existingProjects.getAssignedProjects, data.createProject],
        },
      });
      toast({
        type: 'success',
        icon: 'check',
        title: t('projects.createModal.message.title'),
        description: t('projects.createModal.message.subtitle'),
        animation: 'bounce',
        time: 5000,
      });
      values.title = '';
      values.description = '';
      toggleModal();
    },
    onError(err) {
      console.error(err);
    },
    variables: values,
  });

  function executeCreation() {
    createProject();
  }

  const disableCreate = values.title === '' || values.description === '';

  return (
    <Modal onClose={toggleModal} open={isVisible} size="tiny">
      <Modal.Header>{t('projects.createModal.title')}</Modal.Header>
      <Modal.Content>
        <Form>
          <Input
            fluid
            label={t('projects.createModal.inputs.title.title')}
            placeholder={t('projects.createModal.inputs.title.placeholder')}
            value={values.title}
            name="title"
            type="text"
            onChange={onChange}
          />
          <Header size="tiny">{t('projects.createModal.inputs.description.title')}</Header>
          <TextArea
            value={values.description}
            name="description"
            onChange={onChange}
            placeholder={t('projects.createModal.inputs.description.placeholder')}
          />
        </Form>
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

export default CreateModal;
