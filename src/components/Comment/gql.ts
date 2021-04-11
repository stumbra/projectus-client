import { gql } from '@apollo/client';

export const UPDATE_MESSAGE_MUTATION = gql`
  mutation updateMessage($message: ID!, $body: String!) {
    updateMessage(message: $message, body: $body) {
      id
      body
      creator {
        id
        name
        surname
        avatar
      }
      createdAt
    }
  }
`;

export const DELETE_MESSAGE_MUTATION = gql`
  mutation deleteMessage($message: ID!) {
    deleteMessage(message: $message)
  }
`;
