import { gql } from '@apollo/client';

export const CREATE_BOARD_SECTION_MUTATION = gql`
  mutation createSection($board: ID!, $title: String!) {
    createSection(board: $board, title: $title) {
      id
      title
    }
  }
`;
