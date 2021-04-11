import styled from 'styled-components';
import {
  Input as SemanticInput,
  Header,
  TextArea,
  Label,
} from 'semantic-ui-react';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: space-between;
  margin-top: 1rem;
`;

export const Input = styled(SemanticInput)`
  margin-bottom: 1rem;
`;

export const DescriptionHeader = styled(Header)`
  margin-bottom: 0.5rem;
`;

export const DescriptionTextArea = styled(TextArea)`
  min-height: 50;
`;

export const PersonLabel = styled(Label)`
  margin: 0.2rem;
`;
