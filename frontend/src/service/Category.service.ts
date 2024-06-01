import { instense } from '../api/api.interceptor'
import { EnumUrl } from '../config/url.config'
import { ICategory } from '../types/category.interface'

class CategoryService {
	getAll() {
		return instense<ICategory[]>({
			url: EnumUrl.category,
			method: 'GET'
		})
	}

	getByID(id: string) {
		return instense<ICategory[]>({
			url: EnumUrl.category + id,
			method: 'GET'
		})
	}

	update(name: string, id: string | number) {
		return instense<ICategory[]>({
			url: EnumUrl.category + id,
			method: 'PUT',
			data: {
				name
			}
		})
	}

	delete(id: string | number) {
		return instense<ICategory[]>({
			url: EnumUrl.category + id,
			method: 'DELETE'
		})
	}
}

export default new CategoryService()
