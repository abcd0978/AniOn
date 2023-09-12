import React, { createContext, useReducer, useEffect } from 'react';
const initialState = {
  width: window.innerWidth,
  height: window.innerHeight,
};

function reducer(state, action) {
  switch (action.type) {
    case 'resize':
      return {
        width: window.innerWidth,
        height: window.innerHeight,
      };
    default:
      throw new Error();
  }
}

export const ViewportContext = createContext();

export const ViewportProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const handleResize = () => dispatch({ type: 'resize' });

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <ViewportContext.Provider value={state}>
      {children}
    </ViewportContext.Provider>
  );
};
