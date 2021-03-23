import { gql } from '@apollo/client';

export const GET_ASSIGNED_PROJECTS_QUERY = gql`
  query getAssignedProjects {
    getAssignedProjects {
      title
      description
      personnel {
        name
        surname
        avatar
      }
      owners {
        name
        surname
        avatar
      }
      createdAt
    }
  }
`;
