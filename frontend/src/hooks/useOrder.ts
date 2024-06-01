import { useQuery } from '@tanstack/react-query'
import OrderService from '../service/Order/Order.service'

const useOrder = () => {
	return useQuery({
		queryKey: ['orders'],
		queryFn: OrderService.getAll,
		retry: 3,
		select: ({ data }) => data
	})
}

export default useOrder
