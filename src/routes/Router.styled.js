import styled from 'styled-components';
import backgroundUrl from '../assets/background.jpg';

export const Background = styled.div`
  height: 100%;
  ::before {
    clip-path: polygon(55% 0, 100% 0, 100% 100%, 40% 100%);
    background-image: url(${backgroundUrl});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    height: 100%;
    width: 100%;
    z-index: -1;
    content: '';
    top: 0;
    left: 0;
    position: absolute;
  }
`;
