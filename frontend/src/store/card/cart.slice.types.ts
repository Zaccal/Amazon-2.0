import { ICartItem } from '../../types/cart.interface'

export interface ICardInitialState {
	items: ICartItem[]
}

export interface IAddtoCartPayload extends Omit<ICartItem, 'id'> {}

export interface IChangeQuantityPayload extends Pick<ICartItem, 'id'> {
	type: 'minus' | 'plus'
}

export type TypeSize = 'SHORT' | 'TALL' | 'GRANDE' | 'VENTI'

export interface IChangeSizePayload extends Pick<ICartItem, 'id'> {
	size: TypeSize
}
