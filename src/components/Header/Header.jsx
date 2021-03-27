import React from 'react';
import { Wrapper, Route, Button, LanguageWrapper } from './Header.styled';
import { Menu, Button as SettingsButton, Modal } from 'semantic-ui-react';
import { SidebarContext } from '../../context/sidebar';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const { sidebarVisibility, open, close } = React.useContext(SidebarContext);

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
  }

  return (
    <React.Fragment>
      <Wrapper secondary>
        <Button
          toggle
          active={sidebarVisibility}
          onClick={sidebarVisibility ? close : open}
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
        <Modal.Header>{t('language.primary')}</Modal.Header>
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
              Lietuviškai
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
