import styled from 'styled-components';
import background from '../assets/background.jpg';

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Backdrop = styled.div`
  width: 100%;
  display: flex;
  background-image: url(${background});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  clip-path: polygon(25% 0%, 100% 0%, 100% 100%, 0% 100%);
`;
