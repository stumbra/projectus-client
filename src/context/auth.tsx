import * as React from 'react';

const initialState = {
  user: {
    id: '-1',
    name: '',
    surname: '',
    email: '',
    avatar: '',
  },
};

const AuthContext = React.createContext({
  user: initialState.user,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setUser: (_: unknown) => {
    undefined;
  },
  clearUser: () => {
    undefined;
  },
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

const AuthProvider: React.FC = (props) => {
  const [state, dispatch] = React.useReducer(authReducer, initialState);

  const setUser = (userData) => {
    setTimeout(() => {
      dispatch({
        type: 'SET',
        payload: userData,
      });
    }, 0);
  };

  const clearUser = () => {
    dispatch({
      type: 'CLEAR',
    });
  };

  return (
    <AuthContext.Provider
      value={{ user: state.user, setUser, clearUser }}
      {...props}
    />
  );
};

export { AuthContext, AuthProvider };
