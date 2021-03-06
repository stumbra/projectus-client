import React from 'react';
import { Button } from 'semantic-ui-react';
import { useHistory } from 'react-router';
import {
  Wrapper,
  Container,
  StatusCode,
  Title,
  Subtitle,
} from '../../routes/TokenizedRoute/TokenizedRoute.styled';
import { useTranslation } from 'react-i18next';

const Error = (): React.ReactElement => {
  const history = useHistory();

  const { t } = useTranslation('common');

  return (
    <Wrapper data-testid="error.wrapper">
      <Container>
        <StatusCode>404</StatusCode>
        <Title>{t('error.title')}</Title>
        <Subtitle>{t('error.description')}</Subtitle>
        <Button
          data-testid="error.button"
          primary
          onClick={() => history.goBack()}
        >
          {t('error.button')}
        </Button>
      </Container>
    </Wrapper>
  );
};

export default Error;
