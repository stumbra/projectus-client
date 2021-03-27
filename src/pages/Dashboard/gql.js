import { gql } from '@apollo/client';

export const GET_ASSIGNED_TICKETS_QUERY = gql`
  query getAssignedTickets {
    getAssignedTickets {
      priority
      type
      section {
        title
      }
      history {
        ticket {
          number
          title
        }
        type
        createdAt
      }
    }
  }
`;
