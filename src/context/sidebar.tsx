import * as React from 'react';

const initialState = {
  visible: false,
};

const SidebarContext = React.createContext({
  visible: false,
  open: () => {
    undefined;
  },
  close: () => {
    undefined;
  },
});

const SidebarReducer = (state, action) => {
  switch (action.type) {
    case 'OPEN':
      return { ...state, visible: true };
    case 'CLOSE':
      return { ...state, visible: false };
    default:
      return state;
  }
};

const SidebarProvider: React.FC = (props) => {
  const [state, dispatch] = React.useReducer(SidebarReducer, initialState);

  const open = () => {
    dispatch({
      type: 'OPEN',
    });
  };

  const close = () => {
    dispatch({
      type: 'CLOSE',
    });
  };

  return (
    <SidebarContext.Provider
      value={{ visible: state.visible, open, close }}
      {...props}
    />
  );
};

export { SidebarContext, SidebarProvider };
