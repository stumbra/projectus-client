import { Menu } from 'semantic-ui-react';
import styled from 'styled-components';

export const MenuItem = styled(Menu.Item)`
  background: ${({ active }) =>
    active && 'linear-gradient(90deg, rgba(13,82,134,1) 40%, rgba(250,250,250,1) 90%)'} !important;
  color: ${({ active }) => active && 'white'} !important;
`;

export const Fullname = styled.span`
  font-weight: 600;
  font-size: 1.1rem;
  color: #21272a;
`;
