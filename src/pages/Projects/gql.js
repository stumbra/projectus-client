import { gql } from '@apollo/client';

export const GET_ASSIGNED_PROJECTS_QUERY = gql`
  query getAssignedProjects {
    getAssignedProjects {
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

export const DELETE_PROJECT_MUTATION = gql`
  mutation deleteProject($project: ID!) {
    deleteProject(project: $project)
  }
`;
