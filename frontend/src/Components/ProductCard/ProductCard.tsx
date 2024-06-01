import {
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Image
} from '@nextui-org/react'
import { useAuth } from '../../hooks/useAuth'
import useReviews, { IRating } from '../../hooks/useReviews'
import { IProduct } from '../../types/product.interface'
import Rating from '../Rating/Rating'
import ProductCard_btn_card from './ProductCard_btn_card'
import ProductCard_btn_favorites from './ProductCard_btn_favorites'
import { cutText } from './utils'

interface IProductCard extends IProduct {
	className?: string
}

const ProductCard = ({
	imeges,
	className,
	name,
	price,
	slug,
	createdAt,
	description,
	id
}: IProductCard) => {
	const { data, isFetching } = useReviews<IRating>('ratingProduct', id)
	const { user } = useAuth()

	return (
		<Card className={`${className} max-w-[300px] w-full`}>
			<CardHeader className="relative">
				<Image isZoomed src={imeges[0]} alt="Product img" />
				<ProductCard_btn_favorites product_id={id} />
			</CardHeader>
			<CardBody>
				<div className="mb-3 flex items-center justify-between">
					<p className="text-xl font-medium">{name}</p>
					<p className="text-xl text-accent font-medium">${price}</p>
				</div>
				{!isFetching && <Rating value={data?.rating || 0} />}
				<p className="pt-4">{cutText(12, description)}</p>
			</CardBody>
			<CardFooter>
				{user && (
					<ProductCard_btn_card
						product={{
							imeges,
							description,
							createdAt,
							id,
							name,
							price,
							slug
						}}
					/>
				)}
			</CardFooter>
		</Card>
	)
}

export default ProductCard
