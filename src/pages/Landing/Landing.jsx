import React from 'react';
import { Form, Button, Message, Icon, Image, Header } from 'semantic-ui-react';
import ProjectLogo from '../../assets/logo_1.png';
import { Link, useHistory } from 'react-router-dom';
import {
  Container,
  Heading,
  Subheading,
  Quote,
  PrimarySection,
  SecondarySection,
  ButtonAndForgotWrapper,
  SignupLink,
} from './Landing.styled';
import { useForm } from '../../utils/hooks';
import { LOGIN_USER_MUTATION } from './gql';
import { useMutation } from '@apollo/client';
import { toast } from 'react-semantic-toasts';

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
        <Header>Sign in</Header>
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
          <Form.Field>
            <Form.Input
              label="Password"
              placeholder="Password..."
              name="password"
              type="password"
              value={values.password}
              onChange={onChange}
              error={!!error}
              required
            />
          </Form.Field>
          <ButtonAndForgotWrapper>
            <Button type="submit" primary icon labelPosition="right">
              Sign in
              <Icon name="right arrow" />
            </Button>
            <Link to="/forgot-password">Forgot password?</Link>
          </ButtonAndForgotWrapper>
        </Form>
        <SignupLink to="/register">Don't have an account? Click here!</SignupLink>
      </SecondarySection>
    </Container>
  );
};

export default Landing;
