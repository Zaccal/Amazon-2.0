import { useQuery } from '@tanstack/react-query'
import { IDataFilters } from '../service/Product/Porduct.types'
import ProductService from '../service/Product/Product.service'

type TypeAction = 'all' | 'delete' | 'category-slug' | 'id' | 'similar'

const useProducts = (
	actions: TypeAction = 'all',
	data?: string | number,
	query: IDataFilters = {}
) => {
	const fnTypes = async () => {
		switch (actions) {
			case 'all':
				return await ProductService.getAll(query)
			case 'delete':
				return await ProductService.deleteProduct(data || '')
			case 'category-slug':
				return await ProductService.getByCategorySlug(
					(data as string) || ''
				)
			case 'id':
				return await ProductService.getByID(data || '')
			case 'similar':
				return await ProductService.getSimilar(data || '')
		}
	}

	return useQuery({
		queryKey: ['products', query, data],
		queryFn: fnTypes,
		retry: 3,
		select: ({ data }) => data
	})
}

export default useProducts
