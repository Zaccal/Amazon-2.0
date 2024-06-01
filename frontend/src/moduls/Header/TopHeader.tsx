import { Link, Navbar, NavbarContent, NavbarItem } from '@nextui-org/react'
import { CiLocationOn } from 'react-icons/ci'
import { GrLanguage } from 'react-icons/gr'

const TopHeader = () => {
	return (
		<>
			<Navbar maxWidth="2xl" className="bg-secondary">
				<NavbarContent className="gap-8" justify={'end'}>
					<NavbarItem className="flex items-center gap-3">
						<CiLocationOn className="text-primary text-xl" />
						<Link href="#">Kazakhstan</Link>
					</NavbarItem>
					<NavbarItem className="flex items-center gap-3">
						<GrLanguage className="text-primary" />
						<Link href="#">ENG</Link>
					</NavbarItem>

					<NavbarItem>
						<Link href="#">About Amazon 2.0</Link>
					</NavbarItem>
					<NavbarItem>
						<Link href="#">Custom Service</Link>
					</NavbarItem>
				</NavbarContent>
			</Navbar>
		</>
	)
}

export default TopHeader
