import styled from 'styled-components';
import background from '../assets/background.jpg';

export const Wrapper = styled.div`
  height: fit-content;
  display: flex;
  justify-content: space-between;
`;

export const Backdrop = styled.div`
  width: 100%;
  min-height: 100vh;
  background-image: url(${background});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  clip-path: polygon(25% 0%, 100% 0%, 100% 100%, 0% 100%);
  @media (max-width: 393px) {
    display: none;
  }
`;

export const Container = styled.div`
  padding: 2rem 2rem 0.5rem 2rem;
  overflow-y: scroll;
  background-color: #fafafa;
  height: 100%;
`;
