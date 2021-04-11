import styled from 'styled-components';

export const Text = styled.div`
  overflow: ${({ isExpanded }) => (isExpanded ? 'visible' : 'hidden')};
  line-height: 1.2em;
  height: ${({ isExpanded }) => (isExpanded ? 'auto' : '2.3rem')};
`;

export const Button = styled.div`
  cursor: pointer;
  font-weight: 600;
  :hover {
    text-decoration: underline;
  }
`;
