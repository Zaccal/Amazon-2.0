import { useQuery } from '@tanstack/react-query'
import UserService from '../service/User.service'

export const useProfile = () => {
	return useQuery({
		queryKey: ['profile'],
		queryFn: UserService.getProfile,
		select: ({ data }) => data,
		retry: 3
	})
}
