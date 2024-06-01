import { Button } from '@nextui-org/react'
import useActions from '../../hooks/useActions'
import useTypedSelector from '../../hooks/useTypedSelector'
import { IProduct } from '../../types/product.interface'

interface IProductCard_btn_card {
	product: IProduct
}

const ProductCard_btn_card = ({ product }: IProductCard_btn_card) => {
	const { items } = useTypedSelector(state => state.card)
	const { addCard, removeFromCart } = useActions()

	const isInCard = items.find(item => item.product.id === product.id)

	return (
		<>
			<Button
				onClick={() => {
					if (isInCard) {
						removeFromCart({ id: isInCard.id })
					} else {
						addCard({
							price: product.price,
							product,
							quantity: 1
						})
					}
				}}
				className="w-full"
				variant="solid"
				color="warning"
			>
				{isInCard ? 'remove from' : 'Add to'} the card
			</Button>
		</>
	)
}

export default ProductCard_btn_card
