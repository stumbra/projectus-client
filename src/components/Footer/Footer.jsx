import React from 'react';
import { Wrapper } from './Footer.styled';
import { Header } from 'semantic-ui-react';

const Footer = () => {
  return (
    <Wrapper>
      <Header as="h5">{`Copyright © ${new Date().getFullYear()} Projectus. All Rights Reserved`}</Header>
    </Wrapper>
  );
};

export default Footer;
