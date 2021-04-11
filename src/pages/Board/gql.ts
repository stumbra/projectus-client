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
        id
        title
        owners {
          id
          name
          surname
        }
        personnel {
          id
          name
          surname
        }
        githubReleasesURL
      }
      createdAt
    }
  }
`;

export const REORGANIZE_SECTIONS_MUTATION = gql`
  mutation reorganizeSections($board: ID!, $sections: [ID!]) {
    reorganizeSections(board: $board, sections: $sections) {
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
    }
  }
`;

export const REORGANIZE_TICKETS_MUTATION = gql`
  mutation reorganizeTickets($section: ID!, $tickets: [ID!]) {
    reorganizeTickets(section: $section, tickets: $tickets) {
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
  }
`;
