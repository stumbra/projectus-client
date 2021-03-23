import { gql } from '@apollo/client';

export const GET_ASSIGNED_TICKETS_QUERY = gql`
  query getAssignedTickets {
    getAssignedTickets {
      number
      title
      assignees {
        name
        surname
        avatar
      }
      type
      priority
      createdAt
      section {
        board {
          project {
            title
          }
        }
      }
    }
  }
`;
