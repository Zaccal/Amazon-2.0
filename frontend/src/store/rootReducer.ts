import { combineReducers } from '@reduxjs/toolkit'
import { reducer as cardReducer } from './card/card.slice'
import { reducer as carouselReducer } from './carousel/carousel.slice'
import { reducer as SearchReducer } from './search/search'
import { reducer as UserReducer } from './user/user.slice'

export const rootReducer = combineReducers({
	card: cardReducer,
	carousel: carouselReducer,
	user: UserReducer,
	search: SearchReducer
})
