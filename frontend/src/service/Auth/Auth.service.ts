import axios from 'axios'
import { getContentType } from '../../api/api.helper'
import { instense } from '../../api/api.interceptor'
import { urlConfig } from '../../config/url.config'
import { IAuthResponse, IEmailPassword } from '../../store/user/user.interface'
import { getRefreshTokens, saveToStorage } from './Auth.helper'

type TypeMainFunction = 'login' | 'register'

class AuthService {
	async main(type: TypeMainFunction, data: IEmailPassword) {
		const response = await instense<IAuthResponse>({
			url: urlConfig(type),
			method: 'POST',
			data
		})

		if (response.data.accessToken) {
			saveToStorage(response.data)
		}

		return response.data
	}

	async getNewTokens() {
		const refreshToken = getRefreshTokens()

		const response = await axios.post<string, { data: IAuthResponse }>(
			process.env.SERVER_URL + urlConfig('access_token'),
			{ refreshToken },
			{
				headers: getContentType()
			}
		)

		if (response.data.accessToken) saveToStorage(response.data)

		return response
	}
}

export default new AuthService()
