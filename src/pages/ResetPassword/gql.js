import { gql } from '@apollo/client';

export const RESET_PASSWORD_MUTATION = gql`
  mutation resetPassword($token: String!) {
    resetPassword(token: $token)
  }
`;
