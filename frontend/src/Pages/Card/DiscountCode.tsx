import { Button, Input } from '@nextui-org/react'
import { useState } from 'react'
import { TypeSetState } from '../../types/setState.type'

interface IDicountCode {
	setTotalCost: TypeSetState<number>
	totalCost: number
	setDiscountValue: TypeSetState<number>
}

const dicountCodes = [
	{
		value: 'DISCOUNT',
		discount: 200
	},
	{
		value: '42',
		discount: 500
	},
	{
		value: 'javascript',
		discount: 1000
	}
]

const DiscountCode = ({
	setTotalCost,
	totalCost,
	setDiscountValue
}: IDicountCode) => {
	const [currentCode, setCurrentCode] = useState('')

	const discountHandler = () => {
		dicountCodes.forEach(item => {
			if (item.value === currentCode) {
				setDiscountValue(item.discount)
				setTotalCost(totalCost - item.discount)
			}
		})
	}

	return (
		<>
			<Input
				placeholder="PROMO CODE"
				className="mt-5"
				variant="bordered"
				value={currentCode}
				classNames={{
					inputWrapper: 'pr-0'
				}}
				onChange={event => setCurrentCode(event.target.value)}
				endContent={
					<Button onClick={discountHandler} color="warning">
						Enter
					</Button>
				}
			/>
		</>
	)
}

export default DiscountCode
