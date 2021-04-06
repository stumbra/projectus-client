import styled from 'styled-components';

export const Container = styled.div`
  overflow-y: auto;
  background: white;
  box-shadow: 0 1px 2px 0 rgb(34 36 38 / 15%);
  margin: 1rem 0 1rem 1rem;
  padding: 0.5rem;
  border-radius: 0.3rem;
  border: 1px solid rgba(34, 36, 38, 0.15);
  height: 65vh;
  width: 15rem;
  :last-child {
    margin-right: 1rem;
  }
`;
