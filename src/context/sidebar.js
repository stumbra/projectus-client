import React, { useReducer, createContext } from 'react';

const initialState = {
  visible: false,
};

const SidebarContext = createContext({
  visible: false,
  open: () => {},
  close: () => {},
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

const SidebarProvider = (props) => {
  const [state, dispatch] = useReducer(SidebarReducer, initialState);

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
    <SidebarContext.Provider value={{ sidebarVisibility: state.visible, open, close }} {...props} />
  );
};

export { SidebarContext, SidebarProvider };
