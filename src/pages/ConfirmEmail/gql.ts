import { gql } from '@apollo/client';

export const CONFIRM_EMAIL_MUTATION = gql`
  mutation confirmAccount($token: String!) {
    confirmAccount(token: $token)
  }
`;
