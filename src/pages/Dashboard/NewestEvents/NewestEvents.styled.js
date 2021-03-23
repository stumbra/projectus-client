import styled from 'styled-components';
import { Segment } from 'semantic-ui-react';

export const Container = styled(Segment)`
  display: flex !important;
  align-items: center !important;
  flex-direction: column !important;
  margin: 1rem !important;
`;

export const Inside = styled.div`
  height: ${({ height }) => `calc(${height}px + 2.75rem)`};
  width: ${({ width }) => `${width}px`};
  padding-top: 0.3rem;
  overflow-y: scroll;
`;

export const Info = styled.span`
  font-size: 1.5rem;
  font-weight: 400;
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
`;

export const EventWrapper = styled.div`
  margin: 1rem;
  padding: 0.5rem;
  border-radius: 1rem;
  border: 0.15rem solid grey;
  transition: all 300ms linear !important;
  span {
    display: flex;
    justify-content: center;
    font-size: 1.1rem;
    font-weight: 400;
    text-align: center;
  }
  :hover {
    cursor: pointer;
    background-color: rgba(13, 82, 134, 0.5);
  }
`;
