export const localizedPriority = (string, t) => {
  switch (string) {
    case 'NONE': {
      return t('common.priorities.none').toLowerCase();
    }
    case 'LOW': {
      return t('common.priorities.low').toLowerCase();
    }
    case 'MEDIUM': {
      return t('common.priorities.medium').toLowerCase();
    }
    case 'HIGH': {
      return t('common.priorities.high').toLowerCase();
    }
  }
};

export const localizedType = (string, t) => {
  switch (string) {
    case 'FEATURE': {
      return t('common.types.feature').toLowerCase();
    }
    case 'IMPROVEMENT': {
      return t('common.types.improvement').toLowerCase();
    }
    case 'MAINTENANCE': {
      return t('common.types.maintenance').toLowerCase();
    }
    case 'REQUEST': {
      return t('common.types.request').toLowerCase();
    }
    case 'SERVICE': {
      return t('common.types.service').toLowerCase();
    }
    case 'BUG': {
      return t('common.types.bug').toLowerCase();
    }
  }
};

export const prepareTypeForAPI = (string) => {
  switch (string) {
    case 'NAUJAS FUNKCIONALUMAS': {
      return 'FEATURE';
    }
    case 'PAGERINIMAS': {
      return 'IMPROVEMENT';
    }
    case 'PRIEŽIŪRA': {
      return 'MAINTENANCE';
    }
    case 'PRAŠYMAS': {
      return 'REQUEST';
    }
    case 'TECHNINĖ PRIEŽIŪRA': {
      return 'SERVICE';
    }
    case 'KLAIDOS TAISYMAS': {
      return 'BUG';
    }
  }
};

export const preparePriorityForAPI = (string) => {
  switch (string) {
    case 'NENUSTATYTAS': {
      return 'NONE';
    }
    case 'ŽEMAS': {
      return 'LOW';
    }
    case 'VIDUTINIS': {
      return 'MEDIUM';
    }
    case 'AUKŠTAS': {
      return 'HIGH';
    }
  }
};
