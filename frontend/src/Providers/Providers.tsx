import { NextUIProvider } from '@nextui-org/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from 'next-themes'
import { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from '../store/store'

// eslint-disable-next-line react-refresh/only-export-components
export const queryClientProvider = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false
		}
	}
})

interface IProviders {
	children: ReactNode
}

const Providers = ({ children }: IProviders) => {
	return (
		<QueryClientProvider client={queryClientProvider}>
			<Provider store={store}>
				<PersistGate persistor={persistor}>
					<NextUIProvider>
						<ThemeProvider attribute="class" defaultTheme="dark">
							{children}
						</ThemeProvider>
					</NextUIProvider>
				</PersistGate>
			</Provider>
		</QueryClientProvider>
	)
}

export default Providers
