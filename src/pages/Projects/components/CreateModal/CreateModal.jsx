import { useMutation } from '@apollo/client';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Modal, Header, Form, TextArea, Input, Icon } from 'semantic-ui-react';
import { useForm } from '../../../../utils/hooks';
import { toast } from 'react-semantic-toasts';
import { CREATE_PROJECT_MUTATION, CONNECT_WITH_GITHUB_MUTATION } from './gql';
import { GET_ASSIGNED_PROJECTS_QUERY } from '../../gql';

const CreateModal = ({ isVisible, toggleModal }) => {
  const { t } = useTranslation('common');

  const [githubRepo, setGithubRepo] = React.useState({});

  const { onChange, onSubmit, values } = useForm(executeCreation, {
    title: '',
    description: '',
    owner: '',
    repo: '',
  });

  const [connectWithGithub, { loading: connectWithGithubLoading }] = useMutation(
    CONNECT_WITH_GITHUB_MUTATION,
    {
      onError(err) {
        console.error(err);
      },
    }
  );

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
      values.owner = '';
      values.repo = '';
      setConnected(false);
      setGithubRepo({});
      toggleModal();
    },
    onError(err) {
      console.error(err);
    },
    variables: {
      title: values.title,
      description: values.description,
    },
  });

  function executeCreation() {
    createProject().then(({ data }) => {
      if (Object.keys(githubRepo).length > 0) {
        connectWithGithub({
          variables: {
            project: data.createProject.id,
            url: githubRepo.url,
            versions: githubRepo.versions,
          },
        });
      }
    });
  }

  const disableCreate = values.title === '' || values.description === '';

  const [githubConnectionLoading, setGithubConnectionLoading] = React.useState(false);

  const [connected, setConnected] = React.useState(false);

  const handleGithubConnection = () => {
    setGithubConnectionLoading(true);
    fetch(`https://api.github.com/repos/${values.owner}/${values.repo}/releases`)
      .then((response) => response.json())
      .then((data) => {
        const url = `https://api.github.com/repos/${values.owner}/${values.repo}/releases`;
        const versions = data.map((release) => release.tag_name);
        const sortedVersion = versions
          .map((a) =>
            a
              .split('.')
              .map((n) => +n + 100000)
              .join('.')
          )
          .sort()
          .map((a) =>
            a
              .split('.')
              .map((n) => +n - 100000)
              .join('.')
          );

        setGithubRepo({
          url,
          versions: sortedVersion,
        });
        toast({
          type: 'success',
          icon: 'github',
          title: t('projects.createModal.github.connected.title'),
          description: t('projects.createModal.github.connected.description'),
          animation: 'bounce',
          time: 5000,
        });
        setConnected(true);
        setGithubConnectionLoading(false);
      })
      .catch((error) => {
        setGithubConnectionLoading(false);
        console.error(error);
      });
  };

  const handleGithubDisconnect = () => {
    setGithubRepo({});
    setConnected(false);

    values.owner = '';
    values.repo = '';
    toast({
      type: 'warning',
      icon: 'github',
      title: t('projects.createModal.github.disconnected.title'),
      description: t('projects.createModal.github.disconnected.description'),
      animation: 'bounce',
      time: 5000,
    });
  };

  return (
    <Modal onClose={toggleModal} open={isVisible} size="mini">
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
          <div
            style={{
              marginTop: '26px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Header size="tiny" style={{ margin: 0, marginRight: '0.1rem' }}>
              {t('projects.createModal.github.title')}
            </Header>
            <Icon name="github" size="large" />
            {!connected ? (
              <Button
                size="mini"
                style={{ marginLeft: 'auto' }}
                positive
                onClick={handleGithubConnection}
                disabled={githubConnectionLoading || !values.owner || !values.repo}
                loading={githubConnectionLoading}
              >
                {t('projects.createModal.github.connect')}
              </Button>
            ) : (
              <Button
                size="mini"
                style={{ marginLeft: 'auto' }}
                negative
                onClick={handleGithubDisconnect}
                disabled={githubConnectionLoading || !values.owner || !values.repo}
                loading={githubConnectionLoading}
              >
                {t('projects.createModal.github.disconnect')}
              </Button>
            )}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', marginTop: '14px' }}>
            <Input
              fluid
              label={`${t('projects.createModal.github.inputs.owner.label')}:`}
              placeholder={t('projects.createModal.github.inputs.owner.placeholder')}
              style={{ marginBottom: '1rem' }}
              value={values.owner}
              name="owner"
              onChange={onChange}
              type="text"
            />
            <Input
              fluid
              label={`${t('projects.createModal.github.inputs.repo.label')}:`}
              placeholder={t('projects.createModal.github.inputs.owner.placeholder')}
              value={values.repo}
              name="repo"
              onChange={onChange}
              type="text"
            />
            <span style={{ color: 'lightgray', marginTop: '6px', fontSize: '12px' }}>
              • {t('projects.createModal.github.span')}
            </span>
          </div>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button
          color="blue"
          onClick={onSubmit}
          disabled={loading || disableCreate || githubConnectionLoading || connectWithGithubLoading}
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
