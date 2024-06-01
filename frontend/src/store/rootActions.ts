import { actions as cardActions } from './card/card.slice'
import { actions as searchActions } from './search/search'
import * as userActions from './user/user.actions'

export const rootActions = {
	...userActions,
	...cardActions,
	...searchActions
}
