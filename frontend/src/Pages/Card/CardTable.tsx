import { Divider } from '@nextui-org/react'
import { ReactElement } from 'react'

interface ICardTable {
	children?: ReactElement | ReactElement[]
}

const CardTable = ({ children }: ICardTable) => {
	return (
		<div className="mt-3">
			<div className="grid grid-cols-3">
				<div className="">
					<p className="text-lg font-bold pb-3">Product</p>
				</div>
				<div className="">
					<p className="text-lg font-bold pb-3">Count</p>
				</div>
				<div className="">
					<p className="text-lg font-bold pb-3">Price</p>
				</div>
			</div>
			<Divider />
			{children}
		</div>
	)
}

export default CardTable
