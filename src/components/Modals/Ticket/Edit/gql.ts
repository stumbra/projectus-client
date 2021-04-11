import { gql } from '@apollo/client';

export const UPDATE_TICKET_MUTATION = gql`
  mutation updateTicket(
    $ticket: ID!
    $title: String!
    $description: String
    $assignees: [ID!]!
    $priority: PrioritiesEnum!
    $deadline: String
    $type: TypeEnum!
  ) {
    updateTicket(
      ticket: $ticket
      title: $title
      description: $description
      assignees: $assignees
      priority: $priority
      deadline: $deadline
      type: $type
    ) {
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
      history {
        id
        type
        createdAt
      }
      priority
      type
      deadline
      hours
      createdAt
    }
  }
`;

export const DELETE_TICKET_MUTATION = gql`
  mutation deleteTicket($ticket: ID!) {
    deleteTicket(ticket: $ticket)
  }
`;
