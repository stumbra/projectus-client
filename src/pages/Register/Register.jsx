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
  Quote,
  SecondarySection,
  Hyperlink,
} from '../../theme/components/PlainComponent.styled';
import { motion } from 'framer-motion';

const Register = () => {
  const [errors, setErrors] = React.useState({});

  const history = useHistory();

  const { onChange, onSubmit, values } = useForm(createUser, {
    name: '',
    surname: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

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
      setErrors(err.graphQLErrors[0].extensions.exception);
    },
    variables: values,
  });

  function createUser() {
    if (values.password !== values.confirmPassword)
      setErrors({ details: [{ message: `"Passwords" do not match` }] });
    else sendMail();
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
        <Quote>
          "A Project is complete when it starts working for You, rather than You working for it." -
          Scott Allen
        </Quote>
      </PrimarySection>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <SecondarySection>
          {!lodash.isEmpty(errors) && <ErrorsContent />}
          <Header as="h2">Sign up for an account</Header>
          <Form onSubmit={onSubmit} loading={loading} widths="equal">
            <Form.Group>
              <Form.Input
                label="Name"
                placeholder="Name..."
                name="name"
                type="text"
                value={values.name}
                onChange={onChange}
                required
              />
              <Form.Input
                label="Surname"
                placeholder="Surname..."
                name="surname"
                type="text"
                value={values.surname}
                onChange={onChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Input
                label="Username"
                placeholder="Username..."
                name="username"
                type="text"
                value={values.username.toLowerCase()}
                onChange={onChange}
                required
              />
              <Form.Input
                label="E-mail"
                placeholder="E-mail..."
                name="email"
                type="email"
                value={values.email.toLowerCase()}
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
                value={values.password}
                onChange={onChange}
                required
              />
              <Form.Input
                label="Confirm Password"
                placeholder="Confirm Password..."
                name="confirmPassword"
                type="password"
                value={values.confirmPassword}
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
