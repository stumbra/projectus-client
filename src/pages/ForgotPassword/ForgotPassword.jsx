import React from 'react';
import { Form, Button, Message, Icon, Image, Header } from 'semantic-ui-react';
import ProjectLogo from '../../assets/logo_1.png';
import { useForm } from '../../utils/hooks';
import { useMutation } from '@apollo/client';
import { toast } from 'react-semantic-toasts';
import { FORGOT_PASSWORD_MUTATION } from './gql';

import {
  Container,
  PrimarySection,
  Heading,
  Subheading,
  Quote,
  SecondarySection,
  Hyperlink,
} from '../../theme/components/PlainComponent.styled';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [error, setError] = React.useState('');

  const { onChange, onSubmit, values } = useForm(sendRecoveryEmail, {
    email: '',
  });

  const [sendMail, { loading }] = useMutation(FORGOT_PASSWORD_MUTATION, {
    update() {
      setError('');
      toast({
        type: 'success',
        icon: 'check',
        title: 'Success!',
        description: `Email with recovery link was sent to ${values.email}.`,
        animation: 'bounce',
        time: 5000,
      });
    },
    onError(err) {
      setError(err.graphQLErrors[0].message);
    },
    variables: values,
  });

  function sendRecoveryEmail() {
    sendMail();
  }

  return (
    <Container>
      <Image src={ProjectLogo} size="medium" style={{ marginBottom: '1rem' }} as={Link} to="/" />
      <PrimarySection>
        <Heading>
          Welcome to <strong>Projectus</strong>
        </Heading>
        <Subheading>Project Management Tool</Subheading>
        <Quote>
          "A Project is complete when it starts working for You, rather than You working for it." -
          Scott Allen
        </Quote>
      </PrimarySection>
      <SecondarySection>
        {error && (
          <Message
            warning
            header="A problem occurred with your sign in."
            content={`${error}.`}
            icon="lock"
            size="small"
          />
        )}
        <Header as="h2">Reset your password</Header>
        <Form onSubmit={onSubmit} size="large" loading={loading}>
          <Form.Input
            label="E-mail"
            placeholder="E-mail..."
            name="email"
            type="email"
            value={values.email}
            onChange={onChange}
            error={!!error}
            required
          />
          <Button
            type="submit"
            size="large"
            primary
            icon
            labelPosition="right"
            style={{ marginBottom: '1rem' }}
          >
            Send request
            <Icon name="mail outline" />
          </Button>
        </Form>
        <Hyperlink to="/">Go to Homepage</Hyperlink>
      </SecondarySection>
    </Container>
  );
};

export default ForgotPassword;
