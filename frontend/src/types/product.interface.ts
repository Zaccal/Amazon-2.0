import { ICategory } from './category.interface'
import { IReview } from './review.interface'

export interface IProduct {
	imeges: string[]
	description: string
	name: string
	price: number
	id: number
	createdAt: string
	slug: string
}

export interface IProductFullest extends IProduct {
	reviews: IReview[]
	category: ICategory
}

export interface IProductDetails {
	product: IProduct
}
