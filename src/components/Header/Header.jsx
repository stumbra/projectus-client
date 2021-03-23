import React from 'react';
import { Wrapper, Route, Button } from './Header.styled';
import { Menu, Button as SettingsButton } from 'semantic-ui-react';
import { SidebarContext } from '../../context/sidebar';

const Header = () => {
  const { sidebarVisibility, open, close } = React.useContext(SidebarContext);

  return (
    <Wrapper secondary>
      <Button
        toggle
        active={sidebarVisibility}
        onClick={sidebarVisibility ? close : open}
        circular
        icon="bars"
      />
      <Route>{window.location.pathname.split('/')[1]}</Route>
      <Menu.Menu position="right">
        <SettingsButton toggle circular icon="setting" />
      </Menu.Menu>
    </Wrapper>
  );
};

export default Header;
