import React, { useReducer, createContext } from 'react';

const initialState = {
  user: null,
};

const AuthContext = createContext({
  user: null,
  // eslint-disable-next-line no-unused-vars
  setUser: (_) => {},
  clearUser: () => {},
});

const authReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return { ...state, user: action.payload };
    case 'CLEAR':
      return { ...state, user: null };
    default:
      return state;
  }
};

const AuthProvider = (props) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const setUser = (userData) => {
    dispatch({
      type: 'SET',
      payload: userData,
    });
  };

  const clearUser = () => {
    dispatch({
      type: 'CLEAR',
    });
  };

  return <AuthContext.Provider value={{ user: state.user, setUser, clearUser }} {...props} />;
};

export { AuthContext, AuthProvider };
