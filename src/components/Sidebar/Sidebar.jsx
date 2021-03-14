import React from 'react';
import { Menu, Image, Icon, Container } from 'semantic-ui-react';
import { MenuItem, Fullname } from './Sidebar.styled';
import Logo1 from '../../assets/logo_2.png';
import Logo2 from '../../assets/logo_4.png';
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
    <React.Fragment>
      <Image src={Logo1} size="tiny" style={{ margin: 'auto' }} />
      <Container
        textAlign="center"
        style={{
          marginTop: '1rem',
          flexWrap: 'wrap',
          borderBottom: '1px solid #d4d4d5',
          paddingBottom: '1rem',
          display: 'flex',
          justifyContent: 'space-evenly',
          alignItems: 'center',
        }}
      >
        <Image size="mini" src={user?.avatar} avatar circular />
        <Fullname>{`${user?.name} ${user?.surname}`}</Fullname>
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
      <Image
        src={Logo2}
        style={{ margin: 'auto', position: 'absolute', bottom: 0, left: 0, padding: '1rem' }}
      />
    </React.Fragment>
  );
};

export default Sidebar;
