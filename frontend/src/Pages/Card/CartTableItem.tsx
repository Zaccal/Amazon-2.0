import { Button, Image } from '@nextui-org/react'
import { IoClose } from 'react-icons/io5'
import Counter from '../../Components/Counter/Counter'
import useActions from '../../hooks/useActions'
import { ICartItem } from '../../types/cart.interface'

const CartTableItem = ({ price, product, quantity, id }: ICartItem) => {
	const { removeFromCart, changeQuantity } = useActions()

	return (
		<div className="grid grid-cols-3 items-center mt-5 border border-divider px-4 py-3 rounded-lg">
			<Image
				width={130}
				height={130}
				src={product.imeges[0]}
				className="rounded-lg"
			/>
			<Counter
				state={quantity}
				onPlus={() => changeQuantity({ id, type: 'plus' })}
				onMinus={() => changeQuantity({ id, type: 'minus' })}
			/>
			<div className="flex items-center justify-between w-full">
				<p className="text-xl font-bold">${price * quantity}.00</p>
				<Button
					isIconOnly
					onClick={() => removeFromCart({ id })}
					color="danger"
				>
					<IoClose />
				</Button>
			</div>
		</div>
	)
}

export default CartTableItem
