import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { Wrapper } from './Header.styled';

const Header = () => {
  return (
    <Wrapper>
      <Menu secondary size="massive">
        <Menu.Item name="projectus" header as="h1" />
        <Menu.Menu position="right">
          <Menu.Item name="Home" as={Link} to="/" disabled={window.location.pathname === '/'} />
          <Menu.Item
            name="sign in"
            as={Link}
            to="/login"
            disabled={window.location.pathname === '/login'}
          />
        </Menu.Menu>
      </Menu>
    </Wrapper>
  );
};

export default Header;
