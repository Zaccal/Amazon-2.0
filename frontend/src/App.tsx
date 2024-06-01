import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Card from './Pages/Card/Card'
import Favorites from './Pages/Favorites/Favorites'
import Home from './Pages/Home'
import Thanks from './Pages/Thanks/Thanks'
import Orders from './Pages/UserOrders/UserOrders'
import Authorization from './Pages/authorization'
import Layout from './Providers/Layout/Layout'
import RequireAuth from './hoc/RequireAuth'
import Error from './moduls/Error/Error'

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route
						index
						element={
							<RequireAuth isNavigate={false}>
								<Home />
							</RequireAuth>
						}
					/>
					<Route
						path="/basket"
						element={
							<RequireAuth>
								<Card />
							</RequireAuth>
						}
					/>
					<Route
						path="/favorites"
						element={
							<RequireAuth>
								<Favorites />
							</RequireAuth>
						}
					/>
					<Route path="/authorization" element={<Authorization />} />
					<Route
						path="*"
						element={
							<Error
								error={{
									message: 'Not found 404',
									name: 'Error',
									stack: '404'
								}}
							/>
						}
					/>
					<Route path="/thanks" element={<Thanks />} />
					<Route path="/orders" element={<Orders />} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default App
