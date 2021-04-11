import { gql } from '@apollo/client';

export const CONFIRM_INVITATION_MUTATION = gql`
  mutation confirmInvitation($token: String!) {
    confirmInvitation(token: $token)
  }
`;
