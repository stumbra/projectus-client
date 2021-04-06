import { gql } from '@apollo/client';

export const CREATE_PROJECT_MUTATION = gql`
  mutation createProject($title: String!, $description: String!) {
    createProject(title: $title, description: $description) {
      id
      title
      description
      personnel {
        id
        name
        surname
        avatar
      }
      owners {
        id
        name
        surname
        avatar
      }
      createdAt
    }
  }
`;
