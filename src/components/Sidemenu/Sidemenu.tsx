import React from 'react';
import { Menu, Icon, Image, Sidebar } from 'semantic-ui-react';
import Logo from '../../assets/logo_2.png';
import { AuthContext } from '../../context/auth';
import { SidebarContext } from '../../context/sidebar';
import {
  Heading,
  Title,
  InnerWrapper,
  Profile,
  MenuItem,
} from './Sidemenu.styled';
import { useHistory } from 'react-router';
import { toast } from 'react-semantic-toasts';
import { LOGOUT_MUTATION } from './gql';
import { useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { RouteProps } from 'react-router-dom';

const Sidemenu = ({ children }: RouteProps): React.ReactElement => {
  const { visible, close } = React.useContext(SidebarContext);
  const { user, clearUser } = React.useContext(AuthContext);

  const { t } = useTranslation('common');

  const history = useHistory();

  const [activeItem, setActiveItem] = React.useState(
    history.location.pathname.split('/')[1]
  );

  const handleItemClick = (e, { name }) => {
    setActiveItem(name);
    history.push(`/${name}`);
  };

  const [logout] = useMutation(LOGOUT_MUTATION, {
    update() {
      toast({
        type: 'success',
        icon: 'log out',
        title: t('sidebar.message.title'),
        description: t('sidebar.message.description'),
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
        visible={visible}
      >
        <InnerWrapper>
          <Heading>
            <Image src={Logo} size="tiny" />
            <Title as="h2">Projectus</Title>
          </Heading>
          {user && (
            <Profile>
              <Image size="mini" src={user.avatar} avatar circular />
              <span>{`${user.name} ${user.surname}`}</span>
            </Profile>
          )}
          <MenuItem
            name="dashboard"
            onClick={handleItemClick}
            active={activeItem === 'dashboard'}
          >
            <Icon.Group size="large">
              <Icon name="home" />
            </Icon.Group>
            <span>{t('sidebar.dashboard')}</span>
          </MenuItem>
          <MenuItem
            name="projects"
            onClick={handleItemClick}
            active={activeItem === 'projects' || activeItem === 'board'}
          >
            <Icon.Group size="large">
              <Icon name="briefcase" />
            </Icon.Group>
            <span>{t('sidebar.myProjects')}</span>
          </MenuItem>
          <MenuItem
            name="tickets"
            onClick={handleItemClick}
            active={activeItem === 'tickets' || activeItem === 'ticket'}
          >
            <Icon.Group size="large">
              <Icon name="ticket" />
            </Icon.Group>
            <span>{t('sidebar.myTickets')}</span>
          </MenuItem>
          <MenuItem
            name="profile"
            onClick={handleItemClick}
            active={activeItem === 'profile'}
            disabled
          >
            <Icon.Group size="large">
              <Icon name="user" />
            </Icon.Group>
            <span>{t('sidebar.myProfile')}</span>
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <Icon.Group size="large">
              <Icon name="log out" />
            </Icon.Group>
            <span>{t('sidebar.logout')}</span>
          </MenuItem>
        </InnerWrapper>
      </Sidebar>
      <Sidebar.Pusher style={{ height: '100%', backgroundColor: '#fafafa' }}>
        {children}
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  );
};

export default Sidemenu;
