import { Outlet } from 'react-router-dom'
import Header from '../../moduls/Header/Header'

const Layout = () => {
	return (
		<>
			<Header />
			<Outlet />
			<footer>Footer</footer>
		</>
	)
}

export default Layout
