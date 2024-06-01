import {
	Divider,
	Link,
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem
} from '@nextui-org/react'
import { BsBasket3 } from 'react-icons/bs'
import { IoMdHeartEmpty } from 'react-icons/io'
import { Link as RouterLink } from 'react-router-dom'
import CountNotificationSquare from '../../Components/CountNotificationSquare/CountNotificationSquare'
import useActions from '../../hooks/useActions'
import { useProfile } from '../../hooks/useProfile'
import useTypedSelector from '../../hooks/useTypedSelector'
import MenuHeader from './MenuHeader'
import SearchHeader from './SearchHeader'
import TopHeader from './TopHeader'
import UserHeader from './UserHeader'

const Header = () => {
	const { items } = useTypedSelector(state => state.card)
	const { data } = useProfile()
	const { onChangeSearch } = useActions()

	return (
		<>
			<TopHeader />
			<Navbar as={'div'} maxWidth="2xl" className="bg-text header">
				<NavbarContent as={'div'} className="gap-8">
					<NavbarBrand
						as={RouterLink}
						to={'/'}
						onClick={() => onChangeSearch('')}
					>
						<img
							className="max-w-28"
							src="/Amazon_full_logo.svg"
							alt="Amazon logo"
						/>
					</NavbarBrand>
					<SearchHeader />
					<NavbarItem>
						<Link
							className="relative"
							as={RouterLink}
							to={'/favorites'}
						>
							{data?.favorites.length ? (
								<CountNotificationSquare
									count={data.favorites.length}
								/>
							) : undefined}
							<IoMdHeartEmpty
								className="text-primary"
								size={28}
							/>
						</Link>
					</NavbarItem>

					<NavbarItem>
						<Link
							as={RouterLink}
							className="relative"
							to={'/basket'}
						>
							{items.length ? (
								<CountNotificationSquare count={items.length} />
							) : undefined}
							<BsBasket3 size={22} className="text-primary" />
						</Link>
					</NavbarItem>
					<Divider
						orientation="vertical"
						className="bg-primary h-8"
					/>
					<UserHeader />
				</NavbarContent>

				<NavbarContent as={'div'} className="gap-8 text-primary py-8">
					<NavbarItem>
						<MenuHeader />
					</NavbarItem>
				</NavbarContent>
			</Navbar>
		</>
	)
}

export default Header
