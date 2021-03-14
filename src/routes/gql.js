import { gql } from '@apollo/client';

export const IS_LOGGED_IN_QUERY = gql`
  query isLoggedIn {
    isLoggedIn
  }
`;

export const GET_ME_QUERY = gql`
  query getMe {
    getMe {
      name
      surname
      username
      email
      avatar
    }
  }
`;