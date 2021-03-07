import React from 'react';
import { Form, Button, Message, Icon, Image, Header } from 'semantic-ui-react';
import ProjectLogo from '../../assets/logo_1.png';
import {
  Container,
  Heading,
  Subheading,
  Quote,
  PrimarySection,
  SecondarySection,
  HomeLink,
} from './ForgotPassword.styled';
import { useForm } from '../../utils/hooks';
import { useMutation } from '@apollo/client';
import { toast } from 'react-semantic-toasts';
import { FORGOT_PASSWORD_MUTATION } from './gql';

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
      <Image src={ProjectLogo} size="small" />
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
        <Message
          warning
          header="A problem occurred with your sign in."
          content={`${error}.`}
          icon="lock"
          style={{ opacity: error ? 1 : 0 }}
          size="tiny"
        />
        <Header>Reset your password</Header>
        <Form onSubmit={onSubmit} style={{ marginBottom: '16px' }} loading={loading}>
          <Form.Field>
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
          </Form.Field>

          <Button type="submit" primary icon labelPosition="right">
            Send request
            <Icon name="mail outline" />
          </Button>
        </Form>
        <HomeLink to="/">Go to Homepage</HomeLink>
      </SecondarySection>
    </Container>
  );
};

export default ForgotPassword;
