const generateTemplate = (key) => {
  switch (key) {
    case 'BUG': {
      return `Summary:\n\nSteps to Reproduce:\n\nExpected Results:\n\nActual Results:\n`;
    }
    case 'IMPROVEMENT': {
      return `Improvement Description:\n\nWhy is it necessary:\n`;
    }
    case 'FEATURE': {
      return `Feature Description:\n\nWhy does the project need it:\n`;
    }
    case 'MAINTENANCE': {
      return `Maintenance Description:\n\nWhat does this solve:\n`;
    }
    case 'REQUEST': {
      return `Request Description:\n\nWho requested:\n\nWhat does it solve?\n`;
    }
    case 'SERVICE': {
      return `Service Description:\n\n`;
    }
  }
};

export default generateTemplate;
