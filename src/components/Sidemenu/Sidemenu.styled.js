import { Header, Menu } from 'semantic-ui-react';
import styled from 'styled-components';
import Backdrop from '../../assets/sidemenu.jpg';

export const InnerWrapper = styled.div`
  height: 100%;
  margin: 0;
  border-radius: 0;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${Backdrop});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  padding: 2rem 1rem;
`;

export const Wrapper = styled.div`
  padding: 2rem 1rem;
`;

export const Heading = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  margin: 0 1rem 1rem 1rem;
`;

export const Title = styled(Header)`
  color: white !important;
  margin: 0 !important;
  margin-left: 1rem !important;
`;

export const Profile = styled.div`
  margin: 2.5rem 0rem;
  border-top: 1px solid grey;
  border-bottom: 1px solid grey;
  padding: 1rem;
  display: flex;
  align-items: center;
  span {
    font-size: 1.25rem;
    margin-left: 1rem;
    color: white;
  }
`;

export const MenuItem = styled(Menu.Item)`
  background: none !important;
  background-color: ${({ active }) => active && '#0d5286'} !important;
  -webkit-box-shadow: ${({ active }) =>
    active && '1px 5px 10px 0px rgba(13, 82, 134, 0.8)'} !important;
  -moz-box-shadow: ${({ active }) =>
    active && '1px 5px 10px 0px rgba(13, 82, 134, 0.8)'} !important;
  box-shadow: ${({ active }) => active && '1px 5px 10px 0px rgba(13, 82, 134, 0.8)'} !important;
  color: white !important;
  position: static !important;
  transition: all 300ms linear !important;
  padding: 15px !important;
  border-radius: 3px !important;
  font-size: 14px !important;
  margin-bottom: 1rem;
  &:hover {
    cursor: pointer;
    background-color: ${({ active }) => !active && 'rgba(238, 238, 238, 0.2)'} !important;
  }
  span {
    margin-left: 1rem;
  }
`;
