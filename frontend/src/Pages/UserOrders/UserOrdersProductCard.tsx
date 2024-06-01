import { Image } from '@nextui-org/react'
import { ICartItem } from '../../types/cart.interface'

const UserOrdersProductCard = ({ product, quantity }: ICartItem) => {
	return (
		<div className="grid grid-cols-4 items-center my-8">
			<div className="">
				<Image src={product.imeges[0]} className="w-56" />
			</div>
			<div>
				<p className="text-xl">{product.name}</p>
				<p className="text-lg text-muted">{product.slug}</p>
			</div>
			<div className="text-xl">
				Quantity: <span className="font-bold">{quantity}</span>
			</div>
			<div className="">
				<p className="text-xl text-warning-500">${product.price}</p>
			</div>
		</div>
	)
}

export default UserOrdersProductCard
