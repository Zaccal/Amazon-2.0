import { ReactElement, useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import useActions from '../hooks/useActions'
import { useAuth } from '../hooks/useAuth'
import { getAccessTokens, getRefreshTokens } from '../service/Auth/Auth.helper'

interface IRequireAuth {
	children: ReactElement | ReactElement[]
	isNavigate?: boolean
}

const RequireAuth = ({ children, isNavigate = true }: IRequireAuth) => {
	const { pathname } = useLocation()
	const auth = useAuth()
	const { checkAuth, logout } = useActions()

	useEffect(() => {
		const accessToken = getAccessTokens()
		if (accessToken) {
			checkAuth()
		}
	})

	useEffect(() => {
		const refreshToken = getRefreshTokens()

		if (!refreshToken && auth.user) {
			logout()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pathname])

	if (!auth.user && !auth.isLoading && isNavigate) {
		return (
			<Navigate
				to={'/authorization'}
				state={{ from: pathname }}
				replace
			/>
		)
	}

	return <>{children}</>
}

export default RequireAuth
