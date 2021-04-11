import React from 'react';
import { Form, Button, Message, Icon, Image, Header } from 'semantic-ui-react';
import ProjectLogo from '../../assets/logo_1.png';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from '../../utils/hooks';
import { useMutation } from '@apollo/client';
import { toast } from 'react-semantic-toasts';
import { REGISTER_USER_MUTATION } from './gql';
import lodash from 'lodash';
import {
  Container,
  PrimarySection,
  Heading,
  Subheading,
  SecondarySection,
  Hyperlink,
} from '../../routes/PlainRoute/PlainRoute.styled';
import { motion } from 'framer-motion';
import { Quote } from '../../components';

type FormType = {
  name: string;
  surname: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = (): React.ReactElement => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [errors, setErrors] = React.useState<any>({});

  const history = useHistory();

  const { onChange, onSubmit, values } = useForm(createUser, {
    name: '',
    surname: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const {
    name,
    surname,
    email,
    password,
    confirmPassword,
  } = values as FormType;

  const [sendMail, { loading }] = useMutation(REGISTER_USER_MUTATION, {
    update() {
      setErrors('');
      toast({
        type: 'success',
        icon: 'check',
        title: 'Success!',
        description: `Please check your email & verify it.`,
        animation: 'bounce',
        time: 5000,
      });
      history.push('/');
    },
    onError(err) {
      setErrors(err?.graphQLErrors[0]?.extensions?.exception);
    },
    variables: values,
  });

  function createUser() {
    if (password !== confirmPassword) {
      setErrors({ details: [{ message: `"Passwords" do not match` }] });
    } else {
      sendMail();
    }
  }

  const ErrorsContent = () => {
    return (
      <Message
        warning
        size="small"
        header="A problem occurred with your sign up."
        icon="x"
        content={
          errors.details
            ? errors.details.map((error, index) => {
                return <Message.Item key={index}>{error.message}</Message.Item>;
              })
            : Object.keys(errors.errors).map((key, index) => {
                const error = errors.errors[key];
                return <Message.Item key={index}>{error.message}</Message.Item>;
              })
        }
      />
    );
  };

  return (
    <Container>
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
          {!lodash.isEmpty(errors) && <ErrorsContent />}
          <Header as="h2">Sign up for an account</Header>
          <Form onSubmit={onSubmit} widths="equal">
            <Form.Group>
              <Form.Input
                label="Name"
                placeholder="Name..."
                name="name"
                type="text"
                value={name}
                onChange={onChange}
                required
              />
              <Form.Input
                label="Surname"
                placeholder="Surname..."
                name="surname"
                type="text"
                value={surname}
                onChange={onChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Input
                label="E-mail"
                placeholder="E-mail..."
                name="email"
                type="email"
                value={email.toLowerCase()}
                onChange={onChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Input
                label="Password"
                placeholder="Password..."
                name="password"
                type="password"
                value={password}
                onChange={onChange}
                required
              />
              <Form.Input
                label="Confirm Password"
                placeholder="Confirm Password..."
                name="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={onChange}
                required
              />
            </Form.Group>
            <Button
              type="submit"
              primary
              icon
              labelPosition="right"
              style={{ marginBottom: '1rem' }}
              loading={loading}
            >
              Create an Account
              <Icon name="user outline" />
            </Button>
          </Form>
          <Hyperlink to="/">Go to Homepage</Hyperlink>
        </SecondarySection>
      </motion.div>
    </Container>
  );
};

export default Register;
