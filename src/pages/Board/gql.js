import { gql } from '@apollo/client';

export const GET_BOARD_INFORMATION_QUERY = gql`
  query getBoardInformation($board: ID!) {
    getBoardInformation(board: $board) {
      id
      sections {
        id
        title
        tickets {
          id
          number
          title
          description
          creator {
            id
            name
            surname
          }
          assignees {
            id
            name
            surname
            avatar
          }
          priority
          type
          deadline
          hours
          createdAt
        }
      }
      project {
        title
      }
      createdAt
    }
  }
`;
