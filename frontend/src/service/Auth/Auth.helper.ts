import Cookie from 'js-cookie'
import { EnumToken } from '../../enums/token.enum'
import { IAuthResponse, ITokens } from '../../store/user/user.interface'

export const saveToekenStorage = (data: ITokens) => {
	Cookie.set(EnumToken.accessToken, data.accessToken)
	Cookie.set(EnumToken.refreshToken, data.refreshToken)
}

export const getAccessTokens = () => {
	const accessToken = Cookie.get(EnumToken.accessToken)
	return accessToken || null
}

export const getRefreshTokens = () => {
	const refreshTokens = Cookie.get(EnumToken.refreshToken)
	return refreshTokens || null
}

export const removeTokensStorage = () => {
	Cookie.remove(EnumToken.accessToken)
	Cookie.remove(EnumToken.refreshToken)
	localStorage.removeItem('user')
}

export const saveToStorage = (data: IAuthResponse) => {
	saveToekenStorage(data)

	localStorage.setItem('user', JSON.stringify(data.user))
}
