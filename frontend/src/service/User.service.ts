import { instense } from '../api/api.interceptor'
import { EnumUrl } from '../config/url.config'
import { IUser } from '../types/user.interface'

interface ITypedData extends Partial<Omit<IUser, 'favorites'>> {
	password?: string
}

class UserService {
	getProfile() {
		return instense<IUser>({
			url: EnumUrl.user,
			method: 'GET'
		})
	}

	updateProfile(data: ITypedData) {
		return instense<IUser>({
			url: EnumUrl.user,
			method: 'PUT',
			data
		})
	}

	toggleFavorites(productId: string | number) {
		return instense<string>({
			url: EnumUrl.toggleFavoriteUser + productId,
			method: 'Patch'
		})
	}
}

export default new UserService()
