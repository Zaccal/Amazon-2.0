import { instense } from '../api/api.interceptor'
import { EnumUrl } from '../config/url.config'
import { IReview } from '../types/review.interface'

class Review {
	getAll() {
		return instense<IReview[]>({
			url: EnumUrl.review,
			method: 'GET'
		})
	}

	leaveReview(
		productId: string | number,
		data: Omit<IReview, 'text' | 'rating'>
	) {
		return instense<IReview>({
			url: EnumUrl.leaveReview + productId,
			method: 'POST',
			data
		})
	}

	productRating(productId: string | number) {
		return instense<IReview>({
			url: EnumUrl.productReview + productId,
			method: 'GET'
		})
	}

	delete(productId: string | number) {
		return instense<IReview>({
			url: EnumUrl.review + productId,
			method: 'DELETE'
		})
	}
}

export default new Review()
