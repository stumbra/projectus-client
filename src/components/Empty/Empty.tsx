import React from 'react';
import { Container, Header, Subheader } from './Empty.styled';

type EmptyProps = {
  header: string;
  subheader: string;
};

const Empty = ({ header, subheader }: EmptyProps): React.ReactElement => {
  return (
    <Container data-testid="empty.container">
      <Header>{header}</Header>
      <Subheader>{subheader}</Subheader>
    </Container>
  );
};

export default Empty;
