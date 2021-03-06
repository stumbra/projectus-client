import React from 'react';
import { Wrapper, Route, Button, LanguageWrapper } from './Header.styled';
import { Menu, Button as SettingsButton, Modal } from 'semantic-ui-react';
import { SidebarContext } from '../../context/sidebar';
import { useTranslation } from 'react-i18next';

const Header = (): React.ReactElement => {
  const { visible, open, close } = React.useContext(SidebarContext);

  const [isVisible, setVisibility] = React.useState(false);

  const { t, i18n } = useTranslation('common');

  let title = '';

  switch (window.location.pathname.split('/')[1]) {
    case 'dashboard': {
      title = t('header.dashboard');
      break;
    }
    case 'projects': {
      title = t('header.projects');
      break;
    }
    case 'tickets': {
      title = t('header.tickets');
      break;
    }
    case 'profile': {
      title = t('header.profile');
      break;
    }
    case 'board': {
      title = t('header.board');
      break;
    }
    case 'ticket': {
      title = t('header.details');
      break;
    }
  }

  return (
    <React.Fragment>
      <Wrapper secondary data-testid="header.wrapper">
        <Button
          toggle
          active={visible}
          onClick={visible ? close : open}
          circular
          icon="bars"
        />
        <Route>{title}</Route>
        <Menu.Menu position="right">
          <SettingsButton
            toggle
            circular
            icon="setting"
            onClick={() => {
              setVisibility(true);
            }}
          />
        </Menu.Menu>
      </Wrapper>
      <Modal
        onClose={() => {
          setVisibility(false);
        }}
        open={isVisible}
        size="mini"
      >
        <Modal.Header>
          <React.Fragment>{t('language.primary')}</React.Fragment>
        </Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <p>{t('language.secondary')}</p>
            <p>{t('language.ternary')}</p>
          </Modal.Description>
          <LanguageWrapper>
            <Button
              color={i18n.language === 'en' ? 'green' : 'grey'}
              disabled={i18n.language === 'en'}
              onClick={() => {
                localStorage.setItem('LANGUAGE', 'en');
                i18n.changeLanguage('en');
                setVisibility(false);
              }}
            >
              English
            </Button>
            <Button
              color={i18n.language === 'lt' ? 'green' : 'grey'}
              disabled={i18n.language === 'lt'}
              onClick={() => {
                localStorage.setItem('LANGUAGE', 'lt');
                i18n.changeLanguage('lt');
                setVisibility(false);
              }}
            >
              Lietuvi??kai
            </Button>
          </LanguageWrapper>
        </Modal.Content>
        <Modal.Actions>
          <Button color="black" onClick={() => setVisibility(false)}>
            {t('language.button')}
          </Button>
        </Modal.Actions>
      </Modal>
    </React.Fragment>
  );
};

export default Header;
