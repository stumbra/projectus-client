import React from 'react';
import { Container, Wrapper, Image } from './Footer.styled';
import Logo from '../../assets/logo_1.png';
import { useTranslation } from 'react-i18next';

const Footer = (): React.ReactElement => {
  const { t } = useTranslation('common');

  return (
    <Container>
      <Image src={Logo} size="small" />
      <Wrapper secondary>
        <span>{t('footer')}</span>
      </Wrapper>
    </Container>
  );
};

export default Footer;
