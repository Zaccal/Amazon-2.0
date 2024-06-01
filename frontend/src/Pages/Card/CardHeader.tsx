import { Button } from '@nextui-org/react'
import { IoMdClose } from 'react-icons/io'
import useActions from '../../hooks/useActions'
import useTypedSelector from '../../hooks/useTypedSelector'

const CardHeader = () => {
	const { items } = useTypedSelector(state => state.card)
	const { reset } = useActions()

	return (
		<div className="flex items-center justify-between">
			<div className="flex items-center gap-2">
				<h1 className="text-3xl">Card</h1>
				<span className="text-xl text-gray-500">
					({items.length} products)
				</span>
			</div>
			<Button
				onClick={() => reset()}
				startContent={<IoMdClose size={18} />}
				color="danger"
				variant="light"
				className="text-danger-400 flex items-center gap-2"
			>
				Clear card
			</Button>
		</div>
	)
}

export default CardHeader
