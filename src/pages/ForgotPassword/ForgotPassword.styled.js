import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  height: 100%;
  clip-path: polygon(50% 0, 0 0, 0 100%, 35% 100%);
  padding: 5rem;
`;

export const PrimarySection = styled.div`
  margin-bottom: 16px;
`;

export const Heading = styled.div`
  font-weight: 400;
  font-size: 36px;
  line-height: 46.8px;
  color: #21272a;
  width: 50%;
  margin-top: 16px;
`;

export const Subheading = styled.div`
  font-weight: 600;
  font-size: 60px;
  line-height: 78px;
  color: #21272a;
  width: 45%;
`;

export const Quote = styled.p`
  margin-top: 24px;
  color: #b8bbbe;
  font-weight: 400;
  font-size: 18px;
  width: 35%;
`;

export const SecondarySection = styled.div`
  width: 30%;
`;

export const HomeLink = styled(Link)`
  color: #b8bbbe;
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }
`;
