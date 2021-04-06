import { useMutation } from '@apollo/client';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button as SemanticButton,
  Modal,
  Header,
  Icon,
  Image,
  Form,
  Input as SemanticInput,
} from 'semantic-ui-react';
import { useForm } from '../../../../utils/hooks';
import { toast } from 'react-semantic-toasts';
import {
  UPDATE_PROJECT_SPECS_MUTATION,
  ADD_PERSON_TO_PROJECT_MUTATION,
  REMOVE_PERSON_FROM_PROJECT_MUTATION,
} from './gql';
import {
  Container,
  Input,
  DescriptionHeader,
  DescriptionTextArea,
  PersonLabel,
} from './EditModal.styled';
import { AuthContext } from '../../../../context/auth';
const IS_EMAIL = /\S+@\S+\.\S+/;

const EditModal = ({ project, isVisible, toggleModal, refetch }) => {
  const { t } = useTranslation('common');

  const { user } = React.useContext(AuthContext);

  const [errors, setErrors] = React.useState({});

  const [owners, setOwners] = React.useState(
    project.owners.map((person) => ({ ...person, status: undefined }))
  );

  const [personnel, setPersonnel] = React.useState(
    project.personnel.map((person) => ({ ...person, status: undefined }))
  );

  const { onChange, onSubmit, values } = useForm(
    () => {
      handleSave(() => {
        toast({
          type: 'success',
          icon: 'check',
          title: t('projects.edit.message.title'),
          description: t('projects.edit.message.subtitle'),
          animation: 'bounce',
          time: 5000,
        });
        toggleModal();
      });
    },
    {
      title: project.title,
      description: project.description,
      owner: '',
      person: '',
    }
  );

  const projectSpecsAreTheSame =
    project.title === values.title && project.description === values.description;

  const ownersAreTheSame =
    JSON.stringify(project.owners.map((person) => ({ ...person, status: undefined }))) ===
    JSON.stringify(owners);

  const personnelAreTheSame =
    JSON.stringify(project.personnel.map((person) => ({ ...person, status: undefined }))) ===
    JSON.stringify(personnel);

  const disableSave = projectSpecsAreTheSame && ownersAreTheSame && personnelAreTheSame;

  const [updateProject, { loading: updateProjectLoading }] = useMutation(
    UPDATE_PROJECT_SPECS_MUTATION,
    {
      update: () => {
        refetch();
      },
      onError(err) {
        console.error(err);
      },
      variables: {
        project: project.id,
        title: values.title,
        description: values.description,
      },
    }
  );

  const [updatePersonnel, { loading: updatePersonnelLoading }] = useMutation(
    ADD_PERSON_TO_PROJECT_MUTATION,
    {
      update: () => {
        refetch();
      },
      onError(err) {
        console.error(err);
      },
    }
  );

  const [removePerson, { loading: removePersonLoading }] = useMutation(
    REMOVE_PERSON_FROM_PROJECT_MUTATION,
    {
      update: () => {
        refetch();
      },
      onError(err) {
        console.error(err);
      },
    }
  );

  function handleSave(callback) {
    if (!projectSpecsAreTheSame) updateProject();
    if (!ownersAreTheSame) {
      owners.forEach((person) => {
        switch (person.status) {
          case 'create': {
            updatePersonnel({
              variables: { project: project.id, email: person.email, perk: 'OWNER' },
            });
            break;
          }
          case 'remove': {
            removePerson({
              variables: { project: project.id, person: person.id },
            });
            break;
          }
        }
      });
    }
    if (!personnelAreTheSame) {
      personnel.forEach((person) => {
        switch (person.status) {
          case 'create': {
            updatePersonnel({
              variables: { project: project.id, email: person.email, perk: 'ASSIGNEE' },
            });
            break;
          }
          case 'remove': {
            removePerson({
              variables: { project: project.id, person: person.id },
            });
            break;
          }
        }
      });
    }
    callback();
  }

  return (
    <Modal onClose={toggleModal} open={isVisible} size="tiny">
      <Modal.Header>{t('projects.edit.title')}</Modal.Header>
      <Modal.Content>
        <Input
          fluid
          label={t('projects.edit.inputs.title')}
          value={values.title}
          name="title"
          type="text"
          onChange={onChange}
        />
        <Form>
          <DescriptionHeader size="tiny">
            {t('projects.edit.inputs.description.title')}
          </DescriptionHeader>
          <DescriptionTextArea
            value={values.description}
            name="description"
            onChange={onChange}
            placeholder={t('projects.edit.inputs.description.placeholder')}
          />
        </Form>
        <React.Fragment>
          <Container>
            <Header size="tiny">{t('projects.edit.inputs.owners.title')}</Header>
            <SemanticInput
              size="mini"
              action={{
                icon: 'plus',
                onClick: () => {
                  if (
                    IS_EMAIL.test(values.owner) &&
                    ![...owners, ...personnel].find((p) => p.email === values.owner)
                  ) {
                    setOwners([
                      ...owners,
                      { id: owners.length + 1, email: values.owner, status: 'create' },
                    ]);
                    values.owner = '';
                  } else setErrors({ ownerInput: 'Invalid e-mail' });
                },
              }}
              error={errors.ownerInput}
              onChange={(e) => {
                if (Object.keys(errors).length !== 0 && setErrors({}));
                onChange(e);
              }}
              name="owner"
              value={values.owner}
              placeholder={t('projects.edit.inputs.owners.placeholder')}
            />
          </Container>
          <div>
            {owners.map((person) => (
              <PersonLabel
                image
                key={person.id}
                color={person.status === 'remove' ? 'red' : status === 'create' && 'green'}
              >
                <Image src={person.avatar} />
                {person.name ? `${person.name} ${person.surname} ` : `${person.email}`}
                {person.id !== user.id && (
                  <Icon
                    name="delete"
                    onClick={() => {
                      person.status !== 'create'
                        ? setOwners(
                            owners.map((p) =>
                              p.id === person.id
                                ? { ...p, status: p.status !== 'remove' ? 'remove' : undefined }
                                : p
                            )
                          )
                        : setOwners(owners.filter((p) => p.id !== person.id));
                    }}
                  />
                )}
              </PersonLabel>
            ))}
          </div>
        </React.Fragment>
        <React.Fragment>
          <Container>
            <Header size="tiny">{t('projects.edit.inputs.personnel.title')}</Header>
            <SemanticInput
              size="mini"
              action={{
                icon: 'plus',
                onClick: () => {
                  if (
                    IS_EMAIL.test(values.person) &&
                    ![...owners, ...personnel].find((p) => p.email === values.person)
                  ) {
                    setPersonnel([
                      ...personnel,
                      { id: personnel.length + 1, email: values.person, status: 'create' },
                    ]);
                    values.person = '';
                  } else setErrors({ personInput: 'Invalid e-mail' });
                },
              }}
              error={errors.personInput}
              onChange={(e) => {
                if (Object.keys(errors).length !== 0 && setErrors({}));
                onChange(e);
              }}
              name="person"
              value={values.person}
              placeholder={t('projects.edit.inputs.personnel.placeholder')}
            />
          </Container>
          <div>
            {personnel.map((person) => (
              <PersonLabel
                image
                key={person.id}
                color={person.status === 'remove' ? 'red' : status === 'create' && 'green'}
              >
                <Image src={person.avatar} />
                {person.name ? `${person.name} ${person.surname} ` : `${person.email}`}
                <Icon
                  name="delete"
                  onClick={() => {
                    person.status !== 'create'
                      ? setPersonnel(
                          personnel.map((p) =>
                            p.id === person.id
                              ? { ...p, status: p.status !== 'remove' ? 'remove' : undefined }
                              : p
                          )
                        )
                      : setPersonnel(personnel.filter((p) => p.id !== person.id));
                  }}
                />
              </PersonLabel>
            ))}
          </div>
        </React.Fragment>
      </Modal.Content>
      <Modal.Actions>
        <SemanticButton
          color="blue"
          onClick={onSubmit}
          disabled={
            disableSave || updateProjectLoading || updatePersonnelLoading || removePersonLoading
          }
          loading={updateProjectLoading || updatePersonnelLoading || removePersonLoading}
        >
          {t('projects.edit.buttons.save')}
        </SemanticButton>
        <SemanticButton color="grey" onClick={toggleModal}>
          {t('projects.edit.buttons.close')}
        </SemanticButton>
      </Modal.Actions>
    </Modal>
  );
};

export default EditModal;
