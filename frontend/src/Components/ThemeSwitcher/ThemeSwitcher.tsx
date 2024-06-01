import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

const ThemeSwitcher = () => {
	const { theme, setTheme } = useTheme()
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) return null

	return (
		<>
			<p>Current Theme: {theme}</p>
			<button onClick={() => setTheme('light')}>Light mode</button>
			<button onClick={() => setTheme('dark')}>Dark mode</button>
		</>
	)
}

export default ThemeSwitcher
