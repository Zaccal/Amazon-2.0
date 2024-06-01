import { Spinner } from '@nextui-org/react'
import { useState } from 'react'
import Container from '../Components/Container/Container'
import ProductCard from '../Components/ProductCard/ProductCard'
import SortDropdown from '../Components/SortDropdown/SortDropdown'
import useProducts from '../hooks/useProducts'
import useTypedSelector from '../hooks/useTypedSelector'
import Error from '../moduls/Error/Error'
import { EnumProductSort } from '../service/Product/Porduct.types'
import { IProduct } from '../types/product.interface'

const Home = () => {
	const [sortType, setSortType] = useState(EnumProductSort.NEWEST)
	const { searchTerm } = useTypedSelector(state => state.search)
	const { data, isFetching, error, isSuccess } = useProducts('all', '', {
		sort: sortType,
		searchTerm
	})

	if (!isSuccess && error) {
		return <Error error={error} />
	}

	return (
		<Container className="pt-4" size="6xl">
			<div className="mb-3 flex justify-end">
				<SortDropdown
					selectedSort={sortType}
					setSelectedSort={setSortType}
				/>
			</div>
			{isFetching ? (
				<div className="w-full flex justify-center items-center mt-28">
					<div>
						<p className="pb-4 text-center">Loading...</p>
						<Spinner className="ml-2" size="lg" color="warning" />
					</div>
				</div>
			) : (
				<></>
			)}
			<div className="grid grid-cols-auto-fit gap-4 justify-items-center">
				{!isFetching &&
					!error &&
					(data as IProduct[]).map(data => (
						<ProductCard key={data.id} {...data} />
					))}
			</div>
		</Container>
	)
}

export default Home
