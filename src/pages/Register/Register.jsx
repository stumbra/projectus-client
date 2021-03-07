import React from 'react';
import { Form, Button, Message, Icon, Image, Header, Input } from 'semantic-ui-react';
import ProjectLogo from '../../assets/logo_1.png';
import { useHistory } from 'react-router-dom';
import {
  Container,
  Heading,
  Subheading,
  PrimarySection,
  SecondarySection,
  HomeLink,
  ButtonAndLinkWrapper,
} from './Register.styled';
import { useForm } from '../../utils/hooks';
import { useMutation } from '@apollo/client';
import { toast } from 'react-semantic-toasts';
import { REGISTER_USER_MUTATION } from './gql';
import lodash from 'lodash';

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
      <Message error size="mini">
        <Message.Header>A problem occurred with your sign up.</Message.Header>
        <Message.List>
          {errors.details
            ? errors.details.map((error, index) => (
                <Message.Item key={index}>{error.message}</Message.Item>
              ))
            : Object.keys(errors.errors).map((key, index) => {
                const error = errors.errors[key];
                return <Message.Item key={index}>{error.message}</Message.Item>;
              })}
        </Message.List>
      </Message>
    );
  };

  return (
    <Container>
      <Image src={ProjectLogo} size="small" />
      <PrimarySection>
        <Heading>
          Welcome to <strong>Projectus</strong>
        </Heading>
        <Subheading>Project Management Tool</Subheading>
      </PrimarySection>
      <SecondarySection>
        {!lodash.isEmpty(errors) && <ErrorsContent />}
        <Header>Sign up for an account</Header>
        <Form onSubmit={onSubmit} style={{ marginBottom: '16px' }} loading={loading}>
          <Form.Group widths="equal">
            <Form.Field
              label="Name"
              placeholder="Name..."
              name="name"
              type="text"
              value={values.name}
              onChange={onChange}
              control={Input}
              required
            />
            <Form.Field
              label="Surname"
              placeholder="Surname..."
              name="surname"
              type="text"
              value={values.surname}
              onChange={onChange}
              control={Input}
              required
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Field
              label="Username"
              placeholder="Username..."
              name="username"
              type="text"
              value={values.username.toLowerCase()}
              onChange={onChange}
              control={Input}
              required
            />
            <Form.Field
              label="E-mail"
              placeholder="E-mail..."
              name="email"
              type="email"
              value={values.email.toLowerCase()}
              onChange={onChange}
              control={Input}
              required
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Field
              label="Password"
              placeholder="Password..."
              name="password"
              type="password"
              value={values.password}
              onChange={onChange}
              control={Input}
              required
            />
            <Form.Field
              label="Confirm Password"
              placeholder="Confirm Password..."
              name="confirmPassword"
              type="password"
              value={values.confirmPassword}
              onChange={onChange}
              control={Input}
              required
            />
          </Form.Group>
          <ButtonAndLinkWrapper>
            <Button type="submit" primary icon labelPosition="right">
              Create an Account
              <Icon name="user outline" />
            </Button>
            <HomeLink to="/">Go to Homepage</HomeLink>
          </ButtonAndLinkWrapper>
        </Form>
      </SecondarySection>
    </Container>
  );
};

export default Register;
