import styled from 'styled-components';
import background from '../assets/background.jpg';

export const Wrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: space-between;
`;

export const Backdrop = styled.div`
  width: 100%;
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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  overflow-y: scroll;
`;

export const Content = styled.div`
  padding: 2rem 2rem 0.5rem 2rem;
  background-color: #fafafa;
`;
