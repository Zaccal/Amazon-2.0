import { Button, Spinner } from '@nextui-org/react'
import { useMutation } from '@tanstack/react-query'
import { IoHeartOutline, IoHeartSharp } from 'react-icons/io5'
import { queryClientProvider } from '../../Providers/Providers'
import { useProfile } from '../../hooks/useProfile'
import UserService from '../../service/User.service'

interface IProductCard_btn_favorites {
	product_id: number
}

const ProductCard_btn_favorites = ({
	product_id
}: IProductCard_btn_favorites) => {
	const addFavoriteHandle = useMutation({
		mutationFn: () => UserService.toggleFavorites(product_id),
		onSuccess: () => {
			queryClientProvider.invalidateQueries({ queryKey: ['profile'] })
		}
	})

	const { data, isFetching } = useProfile()

	if (isFetching) <Spinner className="ml-2" size="lg" color="warning" />
	const isFavorited = data?.favorites.some(item => item.id === product_id)

	return (
		<>
			<Button
				size="md"
				isIconOnly
				onClick={() => {
					addFavoriteHandle.mutate()
				}}
				color="danger"
				className="absolute z-10 top-4 right-4"
			>
				{addFavoriteHandle.isPending && (
					<Spinner size="sm" color="warning" />
				)}

				{isFavorited ? (
					<IoHeartSharp color="whtie" className="text-2xl" />
				) : (
					<IoHeartOutline color="whtie" className="text-2xl" />
				)}
			</Button>
		</>
	)
}

export default ProductCard_btn_favorites
