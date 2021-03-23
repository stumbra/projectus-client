import { Menu, Image as SemanticImage } from 'semantic-ui-react';
import styled from 'styled-components';

export const Wrapper = styled(Menu)`
  display: flex;
  align-items: center;
  border-top: 1px solid grey !important;
  padding-top: 1rem !important;
  margin: auto !important;
  span {
    width: 100%;
    text-align: center;
  }
`;

export const Image = styled(SemanticImage)`
  margin: auto;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;
