import styled from 'styled-components';

export const Section = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  @media (max-width: 970px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const SecondInput = styled.div`
  @media (max-width: 970px) {
    margin-top: 1rem;
  }
`;
