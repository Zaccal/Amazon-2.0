import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface IInitialState {
	searchTerm: string
}

const initialState: IInitialState = {
	searchTerm: ''
}

const searchSlice = createSlice({
	name: 'search',
	initialState,
	reducers: {
		onChangeSearch: (state, action: PayloadAction<string>) => {
			state.searchTerm = action.payload
		}
	}
})

export const { actions, reducer } = searchSlice
