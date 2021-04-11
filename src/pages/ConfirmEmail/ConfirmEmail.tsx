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
import { CONFIRM_EMAIL_MUTATION } from './gql';
import { useMutation } from '@apollo/client';

const ConfirmEmail = (): React.ReactElement => {
  const [status, setStatus] = React.useState<boolean | null>(null);

  const history = useHistory();

  const [confirmEmail, { loading }] = useMutation(CONFIRM_EMAIL_MUTATION, {
    update(_, { data: { confirmAccount } }) {
      setStatus(confirmAccount ? true : false);
    },
    onError() {
      setStatus(false);
    },
    variables: { token: window.location.pathname.split('/')[3] },
  });

  React.useEffect(() => {
    confirmEmail();
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
                ? 'Your E-mail was successfully verified & now you can sign into Projectus by clicking the button below'
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

export default ConfirmEmail;
