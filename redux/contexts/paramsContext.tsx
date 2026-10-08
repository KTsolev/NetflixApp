import React, { createContext, useContext, useMemo, useState, ReactNode } from "react";

interface IParamsContext {
  params: {
    type: string,
    searchFor: string,
    genre: string
  }
  setParams: React.Dispatch<React.SetStateAction<IParamsContext['params']>>
}

interface ParamsProviderProps {
  children: ReactNode;
}

const initialValue = {
  params: {
    type: 'movie',
    searchFor: 'all',
    genre: 'Comedy'
  },
  setParams: () => { }
}

export const ParamsContext = createContext<IParamsContext | null>(initialValue)

export const ParamsProvider = ({
  children
}: ParamsProviderProps) => {
  const [params, setParams] = useState<IParamsContext['params']>(initialValue.params)

  const value = useMemo(() => ({ params, setParams }), [params])
  return (
    <ParamsContext.Provider value={value}>{children}</ParamsContext.Provider>
  )
}

export const useParamsContext = () => {
  const context = useContext(ParamsContext);

  // Guard clause to catch usage bugs during development
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
}
