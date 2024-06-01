import {
	Avatar,
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger
} from '@nextui-org/react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import useActions from '../../hooks/useActions'
import { useAuth } from '../../hooks/useAuth'

const UserHeader = () => {
	const { user } = useAuth()
	const { logout, checkAuth } = useActions()

	useEffect(() => {
		checkAuth()
	})

	return (
		<>
			{user ? (
				<Dropdown placement="bottom-end">
					<DropdownTrigger>
						<Avatar
							isBordered
							as="button"
							className="transition-transform w-11"
							color="secondary"
							name="Jason Hughes"
							size="sm"
							src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
						/>
					</DropdownTrigger>
					<DropdownMenu aria-label="Profile Actions" variant="flat">
						<DropdownItem key="profile" className="h-14 gap-2">
							<p className="font-semibold">Signed in as</p>
							<p className="font-semibold">{user.email}</p>
						</DropdownItem>
						<DropdownItem key="settings">My Settings</DropdownItem>
						<DropdownItem key="analytics">Analytics</DropdownItem>
						<DropdownItem key="configurations">
							Configurations
						</DropdownItem>
						<DropdownItem key="help_and_feedback">
							Help & Feedback
						</DropdownItem>
						<DropdownItem
							onClick={() => logout()}
							key="logout"
							color="danger"
						>
							<p className="text-danger">Log Out</p>
						</DropdownItem>
					</DropdownMenu>
				</Dropdown>
			) : (
				<Button as={Link} to={'/authorization'}>
					Sign in
				</Button>
			)}
		</>
	)
}

export default UserHeader
