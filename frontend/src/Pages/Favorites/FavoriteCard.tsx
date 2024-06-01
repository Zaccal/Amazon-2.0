import { Button, Card, CardBody, Image, Spinner } from '@nextui-org/react'
import { useMutation } from '@tanstack/react-query'
import { IoClose } from 'react-icons/io5'
import { queryClientProvider } from '../../Providers/Providers'
import UserService from '../../service/User.service'
import { IFavorite } from '../../types/user.interface'

interface IFavoriteCard {
	product: IFavorite
}

const FavoriteCard = ({ product }: IFavoriteCard) => {
	const removeFromFavoriteHandler = useMutation({
		mutationFn: () => UserService.toggleFavorites(product.id),
		onSuccess: () =>
			queryClientProvider.invalidateQueries({ queryKey: ['profile'] })
	})

	return (
		<Card isBlurred className="mt-8">
			<CardBody>
				<div className="flex items-center justify-between">
					<div className="flex items-start gap-2">
						<Image
							src={product.imeges[0]}
							width={200}
							height={200}
						/>
						<div className="">
							<p className="text-md font-bold">{product.name}</p>
							<p className="text-sm text-muted pt-2">
								SKU: {product.sku}
							</p>
							<p className="text-sm font-bold text-accent pt-2">
								${product.price}
							</p>
						</div>
					</div>
					<Button
						onClick={() => removeFromFavoriteHandler.mutate()}
						isIconOnly
						color="danger"
					>
						{removeFromFavoriteHandler.isPending ? (
							<Spinner size="sm" color="warning" />
						) : (
							<IoClose />
						)}
					</Button>
				</div>
			</CardBody>
		</Card>
	)
}

export default FavoriteCard
