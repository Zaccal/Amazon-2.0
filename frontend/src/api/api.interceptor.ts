import axios from 'axios'
import {
	getAccessTokens,
	removeTokensStorage
} from '../service/Auth/Auth.helper'
import AuthService from '../service/Auth/Auth.service'
import { errorCatch, getContentType } from './api.helper'

export const instense = axios.create({
	baseURL: import.meta.env.VITE_SERVER_URL,
	headers: getContentType()
})

instense.interceptors.request.use(config => {
	const accessToken = getAccessTokens()

	if (config.headers && accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`
	}

	return config
})

instense.interceptors.response.use(
	config => config,
	async error => {
		const originalRequest = error.config

		if (
			(error.message.status === 401 ||
				errorCatch(error) === 'jwt expired' ||
				errorCatch(error) === 'jwt must be provided') &&
			error.config &&
			!error.config._isRetry
		) {
			originalRequest._isRetry = true
			try {
				await AuthService.getNewTokens()

				return instense.request(originalRequest)
			} catch (error) {
				if (errorCatch(error) == 'jwt expired') {
					removeTokensStorage()
				}
			}
		}
	}
)
