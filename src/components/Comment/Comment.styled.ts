import styled from 'styled-components';
import { Comment } from 'semantic-ui-react';

export const EditableComment = styled(Comment.Text)`
  border: ${({ contentEditable }) => contentEditable && '1px solid #0C5184'};
  border-radius: 0.3125rem;
  padding: 0.1rem;
`;
