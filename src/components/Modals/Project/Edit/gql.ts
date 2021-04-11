import { gql } from '@apollo/client';

export const UPDATE_PROJECT_SPECS_MUTATION = gql`
  mutation updateProjectSpecs(
    $project: ID!
    $title: String
    $description: String
  ) {
    updateProjectSpecs(
      project: $project
      title: $title
      description: $description
    ) {
      title
      description
    }
  }
`;

export const ADD_PERSON_TO_PROJECT_MUTATION = gql`
  mutation sendInviteToProject(
    $project: ID!
    $email: String!
    $perk: PerkType!
  ) {
    sendInviteToProject(project: $project, email: $email, perk: $perk)
  }
`;

export const REMOVE_PERSON_FROM_PROJECT_MUTATION = gql`
  mutation removePersonFromProject($project: ID!, $person: ID!) {
    removePersonFromProject(project: $project, person: $person) {
      id
      personnel {
        id
      }
      owners {
        id
      }
    }
  }
`;
