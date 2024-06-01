import { IUser } from './user.interface'

export interface IReview {
	rating: number
	id: number
	text: string
	createAt: string
	user: IUser
}
