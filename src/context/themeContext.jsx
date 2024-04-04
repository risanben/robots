import { createContext, useState } from "react"


export const ThemeContext = createContext()

export function ThemeProvider({ children }) {

	const [theme, setTheme] = useState('dark')

	function onToggleTheme() {
		setTheme(theme === 'light' ? 'dark' : 'light')
	}

	return <ThemeContext.Provider value={{ theme, setTheme, txt: 'shalom', onToggleTheme }}>
		{children}
	</ThemeContext.Provider>
}