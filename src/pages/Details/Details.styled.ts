import styled from 'styled-components';

export const MainSectionWrapper = styled.div`
  margin-top: 1rem;
  display: flex;
  align-content: center;
  justify-content: space-evenly;
  padding-bottom: 1rem;
  @media (max-width: 440px) {
    flex-direction: column;
    align-items: center;
  }
  div {
    display: flex;
    align-items: center;
    @media (max-width: 450px) {
      margin-bottom: 0.5rem;
    }
  }
  span {
    margin-right: 0.5rem;
  }
`;

export const TicketMeta = styled.div`
  display: flex;
  align-items: baseline;
  span {
    margin-left: 0.5rem;
    color: lightgray;
  }
`;

export const SecondaryTicketMeta = styled.div`
  display: flex;
  align-items: baseline;
  margin-top: 1rem;
  justify-content: center;
  @media (max-width: 500px) {
    flex-direction: column;
    align-items: center;
  }
  h5 {
    margin: 0;
    margin-left: 0.5rem;
    color: lightgray;
    @media (max-width: 500px) {
      margin: 0;
      margin-top: 0.5rem;
    }
  }
`;

export const TypePrioDeadlineWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  h4 {
    margin: 0;
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
  }
  @media (max-width: 500px) {
    margin-top: 0.25rem;
  }
`;

export const AssigneesWrapper = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: center;
`;

export const AssigneesTitle = styled.h4`
  margin-right: 1rem;
`;

export const LoggedTimeTitle = styled.h4`
  margin: 0;
  margin-left: 1rem;
`;
