import React from 'react';
import { Grid, Menu, Image, Icon, Container } from 'semantic-ui-react';
import { MenuItem, WelcomeWrapper, WelcomeText, FullnameText } from './Sidebar.styled';
import Logo from '../../assets/logo_2.png';
import { useHistory } from 'react-router';
import { LOGOUT_MUTATION } from './gql';
import { useMutation } from '@apollo/client';
import { toast } from 'react-semantic-toasts';
import { AuthContext } from '../../context/auth';

const Sidebar = () => {
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
        title: 'You logged out',
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
    <Grid.Column
      width={2}
      style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
    >
      <React.Fragment>
        <Container style={{ display: 'flex', padding: '1rem', borderBottom: '1px solid #d4d4d5' }}>
          <Image
            src={user?.avatar}
            size="tiny"
            circular
            style={{ padding: '0.4rem', background: 'white' }}
            bordered
          />

          <WelcomeWrapper>
            <WelcomeText>Welcome,</WelcomeText>
            <FullnameText>{`${user?.name} ${user?.surname}`}</FullnameText>
          </WelcomeWrapper>
        </Container>
        <Menu fluid vertical tabular icon="labeled">
          <MenuItem name="dashboard" onClick={handleItemClick} active={activeItem === 'dashboard'}>
            <Icon name="home" />
            Dashboard
          </MenuItem>
          <MenuItem name="tickets" onClick={handleItemClick} active={activeItem === 'tickets'}>
            <Icon name="ticket" />
            My Tickets
          </MenuItem>
          <MenuItem name="projects" onClick={handleItemClick} active={activeItem === 'projects'}>
            <Icon name="briefcase" />
            My Projects
          </MenuItem>
          <MenuItem
            name="organizations"
            onClick={handleItemClick}
            active={activeItem === 'organizations'}
          >
            <Icon name="building" />
            Organizations
          </MenuItem>

          <MenuItem name="profile" onClick={handleItemClick} active={activeItem === 'profile'}>
            <Icon name="user" />
            My Profile
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <Icon name="logout" />
            Logout
          </MenuItem>
        </Menu>
      </React.Fragment>
      <div>
        <Image src={Logo} size="tiny" style={{ margin: 'auto' }} />
      </div>
    </Grid.Column>
  );
};

export default Sidebar;
