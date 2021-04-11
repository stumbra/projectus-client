/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export const localizedPriority = (string: string, t): string => {
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
    default: {
      return '';
    }
  }
};

export const localizedType = (string: string, t): string => {
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
    default: {
      return '';
    }
  }
};

export const prepareTypeForAPI = (string: string): string => {
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
    default: {
      return '';
    }
  }
};

export const preparePriorityForAPI = (string: string): string => {
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
    default: {
      return '';
    }
  }
};

export const timeConvert = (num: number): string => {
  const hours = num / 60;
  const rhours = Math.floor(hours);
  const minutes = (hours - rhours) * 60;
  const rminutes = Math.round(minutes);
  return rhours + ' h ' + rminutes + ' min';
};

export function ensure<T>(
  argument: T | undefined | null,
  message = 'This value was promised to be there.'
): T {
  if (argument === undefined || argument === null) {
    throw new TypeError(message);
  }

  return argument;
}
