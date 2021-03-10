import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  width: 100vw;
  margin: 5%;
  min-height: calc(100vh - 5rem);
`;

export const PrimarySection = styled.div`
  margin-bottom: 1rem;
`;

export const Heading = styled.h1`
  font-weight: 400;
  font-size: 2.3rem;
  color: #21272a;
`;

export const Subheading = styled.h2`
  font-weight: 600;
  font-size: 3.6rem;
  color: #21272a;
`;

export const Quote = styled.p`
  color: #b8bbbe;
  font-weight: 400;
  font-size: 1.25rem;
  font-style: italic;
  margin-top: 1.5rem;
`;

export const SecondarySection = styled.div`
  margin-top: 2.5rem;
`;

export const ButtonActionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  a {
    align-items: center;
    display: flex;
    cursor: pointer;
    :hover {
      text-decoration: underline;
    }
  }
`;

export const Hyperlink = styled(Link)`
  color: #b8bbbe;
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }
`;
