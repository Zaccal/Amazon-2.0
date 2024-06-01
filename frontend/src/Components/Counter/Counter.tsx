import { Button } from '@nextui-org/react'
import { MouseEventHandler } from 'react'

interface ICounter {
	onPlus?: MouseEventHandler<HTMLButtonElement>
	onMinus?: MouseEventHandler<HTMLButtonElement>
	state?: number
}

const Counter = ({ state = 1, onMinus, onPlus }: ICounter) => {
	return (
		<div className="flex items-center gap-4">
			<Button
				size="sm"
				className="text-lg"
				onClick={event => {
					if (onMinus && state > 1) onMinus(event)
				}}
			>
				-
			</Button>
			<p className="text-lg font-bold">{state}</p>
			<Button size="sm" className="text-lg" onClick={onPlus}>
				+
			</Button>
		</div>
	)
}

export default Counter
