import { gql } from '@apollo/client';

export const IS_LOGGED_IN_QUERY = gql`
  query isLoggedIn {
    isLoggedIn
  }
`;
