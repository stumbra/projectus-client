import React from 'react';
import { Form, Button, Message, Icon, Image, Header } from 'semantic-ui-react';
import ProjectLogo from '../../assets/logo_1.png';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from '../../utils/hooks';
import { LOGIN_USER_MUTATION } from './gql';
import { useMutation } from '@apollo/client';
import { toast } from 'react-semantic-toasts';
import {
  Container,
  PrimarySection,
  Heading,
  Subheading,
  Quote,
  SecondarySection,
  ButtonActionWrapper,
  Hyperlink,
} from '../../theme/components/PlainComponent.styled';
import { motion } from 'framer-motion';

const Landing = () => {
  const [error, setError] = React.useState('');

  const history = useHistory();

  const { onChange, onSubmit, values } = useForm(loginUser, {
    email: '',
    password: '',
  });

  const [setUser, { loading }] = useMutation(LOGIN_USER_MUTATION, {
    update(_, { data: { login: { name, surname } } = {} }) {
      setError('');
      toast({
        type: 'success',
        icon: 'check',
        title: 'Success!',
        description: `Welcome back ${name} ${surname}!`,
        animation: 'bounce',
        time: 5000,
      });
      history.push('/dashboard');
    },
    onError(err) {
      setError(err.graphQLErrors[0].message);
    },
    variables: values,
  });

  function loginUser() {
    setUser();
  }

  return (
    <Container>
      <PrimarySection>
        <Image src={ProjectLogo} size="medium" />
        <Heading>
          Welcome to <strong>Projectus</strong>
        </Heading>
        <Subheading>Project Management Tool</Subheading>
        <Quote>
          "A Project is complete when it starts working for You, rather than You working for it." -
          Scott Allen
        </Quote>
      </PrimarySection>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
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
          <Header as="h2">Sign in</Header>
          <Form onSubmit={onSubmit} loading={loading} widths="equal">
            <Form.Input
              fluid
              label="E-mail"
              placeholder="E-mail..."
              name="email"
              type="email"
              value={values.email}
              onChange={onChange}
              error={!!error}
              required
            />

            <Form.Input
              fluid
              label="Password"
              placeholder="Password..."
              name="password"
              type="password"
              value={values.password}
              onChange={onChange}
              error={!!error}
              required
            />

            <ButtonActionWrapper>
              <Button type="submit" primary icon labelPosition="right">
                Sign in
                <Icon name="right arrow" />
              </Button>
              <Link to="/forgot-password">Forgot password?</Link>
            </ButtonActionWrapper>
          </Form>
          <Hyperlink to="/register">Don't have an account? Click here!</Hyperlink>
        </SecondarySection>
      </motion.div>
    </Container>
  );
};

export default Landing;
