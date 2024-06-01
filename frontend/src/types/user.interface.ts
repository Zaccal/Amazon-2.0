export interface IFavorite {
	id: number
	name: string
	price: number
	imeges: string[]
	slug: string
	sku: string
	description: string
}

export interface IUser {
	id: number
	email: string
	name: string
	avatarPath: string
	phone: string
	favorites: IFavorite[]
}
