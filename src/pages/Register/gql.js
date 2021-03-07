import { gql } from '@apollo/client';

export const REGISTER_USER_MUTATION = gql`
  mutation register(
    $name: String!
    $surname: String!
    $username: String!
    $email: String!
    $password: String!
  ) {
    register(
      name: $name
      surname: $surname
      username: $username
      email: $email
      password: $password
    )
  }
`;
