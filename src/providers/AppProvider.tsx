import React from 'react';
import StrProvider from './StrProvider';

const AppProvider = (props: { children: React.ReactNode }) => {
  return <StrProvider>{props.children}</StrProvider>;
};

export default AppProvider;
