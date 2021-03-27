import { Menu, Button as SemanticButton } from 'semantic-ui-react';
import styled from 'styled-components';

export const Wrapper = styled(Menu)`
  display: flex;
  align-items: center;
  border-bottom: 1px solid grey !important;
  padding-bottom: 1rem;
  margin: auto !important;
`;

export const Route = styled.span`
  font-size: 2rem;
  font-weight: 600;
  ::first-letter {
    text-transform: uppercase;
  }
`;

export const Button = styled(SemanticButton)`
  margin-right: 1rem !important;
`;

export const LanguageWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 1rem;
`;
