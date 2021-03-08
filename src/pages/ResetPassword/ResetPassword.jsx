import React from 'react';
import { Button, Loader, Dimmer } from 'semantic-ui-react';
import { useHistory } from 'react-router';
import { Wrapper, Container, StatusCode, Title, Subtitle } from './ResetPassword.styled';
import { RESET_PASSWORD_MUTATION } from './gql';
import { useMutation } from '@apollo/client';

const ResetPassword = () => {
  const [status, setStatus] = React.useState(undefined);

  const history = useHistory();

  const [resetPassword, { loading }] = useMutation(RESET_PASSWORD_MUTATION, {
    update(_, { data: { resetPassword } }) {
      setStatus(resetPassword ? true : false);
    },
    onError() {
      setStatus(false);
    },
    variables: { token: window.location.pathname.split('/')[4] },
  });

  React.useEffect(() => {
    resetPassword();
  }, []);

  return (
    <Wrapper>
      <Container>
        {!loading && status !== undefined ? (
          <React.Fragment>
            <StatusCode>{status ? 200 : 401}</StatusCode>
            <Title>{status ? 'Success!' : 'Something went wrong.'}</Title>
            <Subtitle>
              {status
                ? 'Your password was successfully changed. We sent you a new password to your E-mail, please check it out & try to sign in.'
                : 'Your link is expired. Please contact our support!'}
            </Subtitle>
            <Button primary onClick={() => history.push('/')}>
              {status ? 'Sign in' : 'Go to Homepage'}
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

export default ResetPassword;
