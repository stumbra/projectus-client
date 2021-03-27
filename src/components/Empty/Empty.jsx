import React from 'react';
import { Container, Header, Subheader } from './Empty.styled';

const Empty = ({ header, subheader }) => {
  return (
    <Container>
      <Header>{header}</Header>
      <Subheader>{subheader}</Subheader>
    </Container>
  );
};

export default Empty;
