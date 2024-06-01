import { nextui } from '@nextui-org/react'

/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./index.html',
		'./src/**/*.{js,ts,jsx,tsx}',
		'./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
	],
	theme: {
		extend: {
			maxWidth: {
				'7xl': 'max-width: 1280px'
			},
			gridTemplateColumns: {
				'auto-fit': 'repeat(auto-fit, minmax(300px, 1fr))'
			},
			colors: {
				muted: '#9a9a9a',
				divider:
					'hsl(var(--nextui-divider) / var(--nextui-divider-opacity, var(--tw-bg-opacity)))'
			}
		}
	},
	darkMode: 'class',
	plugins: [
		nextui({
			themes: {
				dark: {
					colors: {
						text: '#ffffff',
						background: '#121212',
						primary: '#1f1f1f',
						secondary: '#ffffff',
						accent: '#ff9c08'
					}
				},
				light: {
					colors: {
						text: '#131921',
						background: '#ededed',
						primary: '#e1e1e1',
						secondary: '#232f3e',
						accent: '#f59300'
					}
				}
			}
		})
	]
}
