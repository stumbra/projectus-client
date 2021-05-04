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
  SecondarySection,
  ButtonActionWrapper,
  Hyperlink,
} from '../../routes/PlainRoute/PlainRoute.styled';
import { AuthContext } from '../../context/auth';
import { motion } from 'framer-motion';
import { Quote } from '../../components';

type FormType = {
  email: string;
  password: string;
};

const Landing = (): React.ReactElement => {
  const { setUser } = React.useContext(AuthContext);
  const [error, setError] = React.useState('');

  const history = useHistory();

  const { onChange, onSubmit, values } = useForm(loginUser, {
    email: '',
    password: '',
  });

  const [login, { loading }] = useMutation(LOGIN_USER_MUTATION, {
    update(_, { data: { login: { id, name, surname, email, avatar } } = {} }) {
      setError('');
      toast({
        type: 'success',
        icon: 'check',
        title: 'Success!',
        description: `Welcome back ${name} ${surname}!`,
        animation: 'bounce',
        time: 5000,
      });
      setUser({ id, name, surname, email, avatar });
      history.push('/dashboard');
    },
    onError(err) {
      setError(err.graphQLErrors[0].message);
    },
    variables: values,
  });

  function loginUser() {
    login();
  }

  const { email, password } = values as FormType;

  return (
    <Container data-testid="landing.container">
      <PrimarySection>
        <Image src={ProjectLogo} size="medium" />
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
          <Header as="h2">Sign in</Header>
          <Form onSubmit={onSubmit} widths="equal">
            <Form.Input
              fluid
              label="E-mail"
              placeholder="E-mail..."
              name="email"
              type="email"
              value={email}
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
              value={password}
              onChange={onChange}
              error={!!error}
              required
            />

            <ButtonActionWrapper>
              <Button
                type="submit"
                primary
                icon
                labelPosition="right"
                loading={loading}
              >
                Sign in
                <Icon className="right arrow" />
              </Button>
              <Link to="/forgot-password">Forgot password?</Link>
            </ButtonActionWrapper>
          </Form>
          <Hyperlink to="/register">
            Don't have an account? Click here!
          </Hyperlink>
        </SecondarySection>
      </motion.div>
    </Container>
  );
};

export default Landing;
