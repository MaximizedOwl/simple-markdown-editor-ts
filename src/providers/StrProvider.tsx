import React from 'react';
import Constants from '../utils/constants';

// createContextはProviderの中に書く
export const StrContext = React.createContext(
  {} as {
    str: string;
    setStr: React.Dispatch<React.SetStateAction<string>>;
  }
);

const StrProvider = (props: { children: React.ReactNode }) => {
  const [str, setStr] = React.useState(Constants.INIT_TEXTBOX_STR);

  return (
    <StrContext.Provider value={{ str, setStr }}>
      {props.children}
    </StrContext.Provider>
  );
};

export default StrProvider;
