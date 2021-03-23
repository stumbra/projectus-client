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

const Error = () => {
  const history = useHistory();

  return (
    <Wrapper>
      <Container>
        <StatusCode>404</StatusCode>
        <Title>Page not found</Title>
        <Subtitle>
          The page you are looking for might have been removed, had its name changed or is
          temporarily unavailable
        </Subtitle>
        <Button primary onClick={() => history.push('/')}>
          Go back
        </Button>
      </Container>
    </Wrapper>
  );
};

export default Error;
