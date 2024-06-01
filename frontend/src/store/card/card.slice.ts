import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import {
	IAddtoCartPayload,
	ICardInitialState,
	IChangeQuantityPayload
} from './cart.slice.types'

const initialState: ICardInitialState = {
	items: []
}

const cardSlice = createSlice({
	name: 'Card',
	initialState,
	reducers: {
		addCard: (state, { payload }: PayloadAction<IAddtoCartPayload>) => {
			const isExist = state.items.some(
				item => item.product.id === payload.product.id
			)

			if (!isExist)
				state.items.push({ ...payload, id: state.items.length })
		},
		removeFromCart: (state, { payload }: PayloadAction<{ id: number }>) => {
			state.items = state.items.filter(item => item.id !== payload.id)
		},
		changeQuantity: (
			state,
			{ payload }: PayloadAction<IChangeQuantityPayload>
		) => {
			const { id, type } = payload

			const item = state.items.find(item => item.id === id)

			if (item) type === 'plus' ? item.quantity++ : (item.quantity -= 1)
		},
		reset: state => {
			state.items = []
		}
	}
})

export const { actions, reducer } = cardSlice
