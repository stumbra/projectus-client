import styled from 'styled-components';
import { Image as SemanticImage } from 'semantic-ui-react';

export const Container = styled.div`
  display: flex;
  justify-content: center;
`;

export const Image = styled(SemanticImage)`
  border: 2px solid white;
  background-color: white !important;
  :not(:first-child) {
    margin-left: -10px !important;
  }
  max-width: none;
  width: ${({ size }) => (size === 'extra-tiny' ? '2rem' : '2.1875rem')};
  height: auto;
`;

export const Overmax = styled.div`
  background-color: #e0e1e2;
  max-width: none;
  width: ${({ size }) => (size === 'extra-tiny' ? '2rem' : '2.1875rem')};
  height: auto;
  border-radius: 500rem;
  margin-left: -10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: ${({ disabled }) => !disabled && 'cursor'};
  font-size: ${({ size }) => size === 'extra-tiny' && '0.8rem'};
`;

export const Button = styled.div`
  align-items: center;
  display: flex;
  font-size: 0.8rem;
  cursor: pointer;
  text-align: center;
  :hover {
    text-decoration: underline;
  }
`;
