import { instense } from '../../api/api.interceptor'
import { EnumUrl } from '../../config/url.config'
import { IProduct } from '../../types/product.interface'
import { IDataFilters } from './Porduct.types'

class Product {
	getAll(queryData: IDataFilters = {}) {
		return instense<IProduct[]>({
			url: EnumUrl.product,
			method: 'GET',
			params: queryData
		})
	}

	getSimilar(productId: string | number) {
		return instense<IProduct[]>({
			url: EnumUrl.similarProduct + productId,
			method: 'GET'
		})
	}

	getByID(productId: string | number) {
		return instense<IProduct>({
			url: EnumUrl.product + productId,
			method: 'GET'
		})
	}

	getByCategorySlug(slug: string) {
		return instense<IProduct>({
			url: EnumUrl.productByCategorySlug + slug,
			method: 'GET'
		})
	}

	deleteProduct(productId: string | number) {
		return instense<IProduct>({
			url: EnumUrl.product + productId,
			method: 'DELETE'
		})
	}
}

export default new Product()
