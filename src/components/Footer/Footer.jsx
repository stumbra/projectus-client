import React from 'react';
import { Wrapper, Image } from './Footer.styled';
import Logo from '../../assets/logo_1.png';

const year = new Date().getFullYear();

const Footer = () => {
  return (
    <div>
      <Image src={Logo} size="small" />
      <Wrapper secondary>
        <span>Copyright &copy; {year} Projectus. All Rights Reserved</span>
      </Wrapper>
    </div>
  );
};

export default Footer;
