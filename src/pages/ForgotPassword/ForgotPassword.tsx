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
  SecondarySection,
  Hyperlink,
} from '../../routes/PlainRoute/PlainRoute.styled';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Quote } from '../../components';

type FormType = {
  email: string;
};

const ForgotPassword = (): React.ReactElement => {
  const [error, setError] = React.useState('');

  const { onChange, onSubmit, values } = useForm(sendRecoveryEmail, {
    email: '',
  });

  let { email } = values as FormType;

  const [sendMail, { loading }] = useMutation(FORGOT_PASSWORD_MUTATION, {
    update() {
      setError('');
      toast({
        type: 'success',
        icon: 'check',
        title: 'Success!',
        description: `Email with recovery link was sent to ${email}.`,
        animation: 'bounce',
        time: 5000,
      });
      email = '';
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
    <Container data-testid="forgot.password.container">
      <PrimarySection>
        <Image src={ProjectLogo} size="medium" as={Link} to="/" />
        <Heading>
          Welcome to <strong>Projectus</strong>
        </Heading>
        <Subheading>Project Management Tool</Subheading>
        <Quote
          text="A Project is complete when it starts working for You, rather than You working for it."
          author="Scott Allen, politician"
        />
      </PrimarySection>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
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
          <Form onSubmit={onSubmit} widths="equal">
            <Form.Input
              label="E-mail"
              placeholder="E-mail..."
              name="email"
              type="email"
              value={email}
              onChange={onChange}
              error={!!error}
              required
            />
            <Button
              type="submit"
              primary
              icon
              labelPosition="right"
              style={{ marginBottom: '1rem' }}
              loading={loading}
            >
              Send request
              <Icon name="mail outline" />
            </Button>
          </Form>
          <Hyperlink to="/">Go to Homepage</Hyperlink>
        </SecondarySection>
      </motion.div>
    </Container>
  );
};

export default ForgotPassword;
