import { Spinner } from '@nextui-org/react'
import Container from '../../Components/Container/Container'
import { useProfile } from '../../hooks/useProfile'
import Error from '../../moduls/Error/Error'
import FavoriteCard from './FavoriteCard'

const Favorites = () => {
	const { data, isFetching, error } = useProfile()

	if (isFetching)
		<div className="mt-28 flex justify-center">
			<Spinner size="lg" color="warning" />
		</div>

	if (error) <Error error={error} />

	return (
		<Container size="6xl" className="pt-8">
			<h1 className="text-3xl font-bold">Favorites: </h1>
			<>
				{!data?.favorites.length && (
					<h3 className="text-2xl text-muted text-center">
						Favorites is empty
					</h3>
				)}
			</>
			<>
				{data?.favorites.map(dataProduct => (
					<FavoriteCard key={dataProduct.id} product={dataProduct} />
				))}
			</>
		</Container>
	)
}

export default Favorites
