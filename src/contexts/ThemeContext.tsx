import { createContext } from "react";

import useLocalStorage from "../hooks/useLocalStorage";

interface ThemeContextProps {
  theme: string
  setTheme: Function
}

export const ThemeContext = createContext<ThemeContextProps>({
  theme: "",
  setTheme: () => null,
})

type ThemeContextProviderProps = {
  children: React.ReactNode
}

export const ThemeProvider = ({children} : ThemeContextProviderProps) => {
  const [theme, setTheme] = useLocalStorage("theme", "light");
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
