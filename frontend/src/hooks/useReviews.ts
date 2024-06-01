import { useQuery } from '@tanstack/react-query'
import ReviewService from '../service/Review.service'

type TypeReviewAction = 'all' | 'delete' | 'ratingProduct'

export interface IRating {
	rating: number
}

const useReviews = <T>(
	action: TypeReviewAction = 'all',
	data?: string | number
) => {
	const fnAction = async () => {
		switch (action) {
			case 'all':
				return await ReviewService.getAll()
			case 'delete':
				return await ReviewService.delete(data || '')
			case 'ratingProduct':
				return await ReviewService.productRating(data || '')
		}
	}

	return useQuery({
		queryKey: ['reviews'],
		queryFn: fnAction,
		retry: 3,
		select: ({ data }): T => data as T
	})
}

export default useReviews
