import React from 'react';
import { Button, Loader, Dimmer } from 'semantic-ui-react';
import { useHistory } from 'react-router';
import {
  Wrapper,
  Container,
  StatusCode,
  Title,
  Subtitle,
} from '../../routes/TokenizedRoute/TokenizedRoute.styled';
import { CONFIRM_INVITATION_MUTATION } from './gql';
import { useMutation } from '@apollo/client';

const ConfirmInvitation = (): React.ReactElement => {
  const [status, setStatus] = React.useState<boolean | null>(null);

  const history = useHistory();

  const [addUserToProject, { loading }] = useMutation(
    CONFIRM_INVITATION_MUTATION,
    {
      update(_, { data: { confirmInvitation } }) {
        setStatus(confirmInvitation ? true : false);
      },
      onError() {
        setStatus(false);
      },
      variables: { token: window.location.pathname.split('/')[3] },
    }
  );

  React.useEffect(() => {
    addUserToProject();
  }, []);

  return (
    <Wrapper>
      <Container>
        {!loading && status !== undefined ? (
          <React.Fragment>
            <StatusCode>{status ? 200 : 401}</StatusCode>
            <Title>{status ? 'Success!' : 'Something went wrong'}</Title>
            <Subtitle>
              {status
                ? 'You have been successfully added to the project'
                : 'Your link is expired. Please contact our support!'}
            </Subtitle>
            <Button primary onClick={() => history.push('/')}>
              {status ? 'Continue' : 'Go back'}
            </Button>
          </React.Fragment>
        ) : (
          <Dimmer active inverted>
            <Loader size="massive">Loading...</Loader>
          </Dimmer>
        )}
      </Container>
    </Wrapper>
  );
};

export default ConfirmInvitation;
