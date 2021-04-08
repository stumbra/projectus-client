import { gql } from '@apollo/client';

export const GET_TICKET_INFORMATION_QUERY = gql`
  query getTicket($ticket: ID!) {
    getTicket(ticket: $ticket) {
      id
      number
      title
      description
      creator {
        id
        name
        surname
        avatar
      }
      assignees {
        id
        name
        surname
        avatar
      }
      messages {
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
      history {
        id
        type
        createdAt
      }
      section {
        id
        title
        board {
          project {
            owners {
              id
              name
              surname
              avatar
            }
            personnel {
              id
              name
              surname
              avatar
            }
          }
        }
      }
      priority
      type
      deadline
      hours
      createdAt
    }
  }
`;

export const CREATE_MESSAGE_MUTATION = gql`
  mutation createMessage($ticket: ID!, $body: String!) {
    createMessage(ticket: $ticket, body: $body) {
      id
      body
      createdAt
    }
  }
`;
