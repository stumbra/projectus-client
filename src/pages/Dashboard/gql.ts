import { gql } from '@apollo/client';

export const GET_ASSIGNED_TICKETS_QUERY = gql`
  query getAssignedTickets {
    getAssignedTickets {
      priority
      type
      section {
        title
      }
      deadline
      history {
        ticket {
          id
          number
          title
        }
        type
        createdAt
      }
    }
  }
`;
