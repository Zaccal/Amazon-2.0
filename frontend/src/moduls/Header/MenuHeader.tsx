import { Button } from '@nextui-org/react'
import { useState } from 'react'

const MenuHeader = () => {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<>
			<Button variant="light" color="primary">
				All
			</Button>
		</>
	)
}

export default MenuHeader
