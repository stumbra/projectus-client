/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
const generateTemplate = (key: string, t, i18n) => {
  switch (key) {
    case t('common.types.bug').toUpperCase(): {
      return i18n.language === 'en'
        ? `Summary:\n\nSteps to Reproduce:\n\nExpected Results:\n\nActual Results:\n`
        : `Aprašymas:\n\nReprodukcijos žingsniai:\n\nTikėtini rezultatai:\n\nFaktiniai rezultatai:\n`;
    }
    case t('common.types.improvement').toUpperCase(): {
      return i18n.language === 'en'
        ? `Improvement Description:\n\nWhy is it necessary:\n`
        : `Patobulinimo aprašymas:\n\nKodėl tai būtina:\n`;
    }
    case t('common.types.feature').toUpperCase(): {
      return i18n.language === 'en'
        ? `Feature Description:\n\nWhy does the project need it:\n`
        : `Funkcijos aprašymas:\n\nKodėl projektui to reikia:\n`;
    }
    case t('common.types.maintenance').toUpperCase(): {
      return i18n.language === 'en'
        ? `Maintenance Description:\n\nWhat does this solve:\n`
        : `Priežiūros aprašas:\n\nKą tai išsprendžia:\n`;
    }
    case t('common.types.request').toUpperCase(): {
      return i18n.language === 'en'
        ? `Request Description:\n\nWho requested:\n\nWhat does it solve?\n`
        : `Užklausos aprašas:\n\nKas paprašė:\n\nKą tai išsprendžia?\n`;
    }
    case t('common.types.service').toUpperCase(): {
      return i18n.language === 'en'
        ? `Service Description:\n\n`
        : `Aptarnavimo Aprašymas:\n\n`;
    }
    default: {
      return '';
    }
  }
};

export default generateTemplate;
