import { gql } from '@apollo/client';

export const UPDATE_SECTION_TITLE_MUTATION = gql`
  mutation updateSection($section: ID!, $title: String!) {
    updateSection(section: $section, title: $title) {
      id
      title
    }
  }
`;

export const DELETE_SECTION_MUTATION = gql`
  mutation deleteSection($section: ID!) {
    deleteSection(section: $section)
  }
`;
