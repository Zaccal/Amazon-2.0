import { IPagination } from '../../types/Pagination.interface'

export type TypeData = {
	name: string
	price?: number
	description?: string
	imeges?: string[]
	category?: string
}

export enum EnumProductSort {
	HIGH_PRICE = 'high-price',
	LOW_PRICE = 'low-price',
	NEWEST = 'newest',
	OLDEST = 'oldest'
}

export interface IDataFilters extends IPagination {
	sort?: EnumProductSort
	searchTerm?: string
}
