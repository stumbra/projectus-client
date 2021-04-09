import styled from 'styled-components';

export const CommentsWrapper = styled.div``;

export const MainSectionWrapper = styled.div`
  margin-top: 1rem;
  display: flex;
  align-content: center;
  justify-content: space-between;
  div {
    display: flex;
    align-items: center;
  }
  span {
    margin-right: 0.5rem;
  }
`;

export const Container = styled.div`
  display: flex;
  width: 100%;
  margin-top: 1rem;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const PrimaryMetaWrapper = styled.div`
  margin-right: 1rem;
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
  flex-wrap: wrap;
  h5 {
    margin: 0;
    margin-left: 0.5rem;
    color: lightgray;
  }
`;

export const TypePrioDeadlineWrapper = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  h4 {
    margin: 0;
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
  }
`;

export const AssigneesWrapper = styled.div`
  display: flex;
  align-items: baseline;
`;

export const AssigneesTitle = styled.h4`
  margin-right: 1rem;
`;

export const LoggedTimeTitle = styled.h4`
  margin: 0;
  margin-left: 1rem;
`;
