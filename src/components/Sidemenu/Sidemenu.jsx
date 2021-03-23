import React from 'react';
import { Menu, Icon, Image, Sidebar } from 'semantic-ui-react';
import Logo from '../../assets/logo_2.png';
import { AuthContext } from '../../context/auth';
import { SidebarContext } from '../../context/sidebar';
import { Heading, Title, InnerWrapper, Profile, MenuItem } from './Sidemenu.styled';
import { useHistory } from 'react-router';
import { toast } from 'react-semantic-toasts';
import { LOGOUT_MUTATION } from './gql';
import { useMutation } from '@apollo/client';

const Sidemenu = ({ children }) => {
  const { sidebarVisibility, close } = React.useContext(SidebarContext);
  const { user, clearUser } = React.useContext(AuthContext);

  const history = useHistory();

  const [activeItem, setActiveItem] = React.useState('dashboard');

  const handleItemClick = (e, { name }) => {
    setActiveItem(name);
    history.push(`/${name}`);
  };

  const [logout] = useMutation(LOGOUT_MUTATION, {
    update() {
      toast({
        type: 'success',
        icon: 'logout',
        title: `You logged out `,
        description: `See you later!`,
        animation: 'bounce',
        time: 5000,
      });
      clearUser();
      history.push('/');
    },
  });

  function handleLogout() {
    logout();
  }

  return (
    <Sidebar.Pushable>
      <Sidebar
        as={Menu}
        animation="push"
        direction="left"
        inverted
        onHide={close}
        vertical
        visible={sidebarVisibility}
      >
        <InnerWrapper>
          <Heading>
            <Image src={Logo} size="tiny" />
            <Title as="h2">Projectus</Title>
          </Heading>
          <Profile>
            <Image size="mini" src={user?.avatar} avatar circular />
            <span>{`${user?.name} ${user?.surname}`}</span>
          </Profile>
          <MenuItem name="dashboard" onClick={handleItemClick} active={activeItem === 'dashboard'}>
            <Icon.Group size="large">
              <Icon name="home" />
            </Icon.Group>
            <span>Dashboard</span>
          </MenuItem>
          <MenuItem name="projects" onClick={handleItemClick} active={activeItem === 'projects'}>
            <Icon.Group size="large">
              <Icon name="briefcase" />
            </Icon.Group>
            <span>My Projects</span>
          </MenuItem>
          <MenuItem name="tickets" onClick={handleItemClick} active={activeItem === 'tickets'}>
            <Icon.Group size="large">
              <Icon name="ticket" />
            </Icon.Group>
            <span>My Tickets</span>
          </MenuItem>
          <MenuItem name="profile" onClick={handleItemClick} active={activeItem === 'profile'}>
            <Icon.Group size="large">
              <Icon name="user" />
            </Icon.Group>
            <span>My Profile</span>
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <Icon.Group size="large">
              <Icon name="logout" />
            </Icon.Group>
            <span>Log out</span>
          </MenuItem>
        </InnerWrapper>
      </Sidebar>
      <Sidebar.Pusher style={{ height: '100%' }}>{children}</Sidebar.Pusher>
    </Sidebar.Pushable>
  );
};

export default Sidemenu;
