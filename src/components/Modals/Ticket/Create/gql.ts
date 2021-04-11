import { gql } from '@apollo/client';

export const TICKET_CREATION_MUTATION = gql`
  mutation createTicket(
    $section: ID!
    $title: String!
    $description: String
    $assignees: [ID!]!
    $priority: PrioritiesEnum!
    $deadline: String
    $type: TypeEnum!
  ) {
    createTicket(
      section: $section
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
