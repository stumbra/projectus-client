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
      githubReleasesURL
    }
  }
`;

export const CONNECT_WITH_GITHUB_MUTATION = gql`
  mutation connectGithub($project: ID!, $url: String!, $versions: [String!]!) {
    connectGithub(project: $project, url: $url, versions: $versions) {
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
      githubReleasesURL
    }
  }
`;
