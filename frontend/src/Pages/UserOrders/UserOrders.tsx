import { Spinner } from '@nextui-org/react'
import Container from '../../Components/Container/Container'
import useOrder from '../../hooks/useOrder'
import UserOrdersCard from './UserOrdersCard'

const UserOrders = () => {
	const { data, isFetching, isLoading } = useOrder()

	if (isLoading || isFetching)
		<Spinner
			className="flex justify-center mt-20"
			color="warning"
			size="lg"
		/>

	return (
		<Container size="6xl" className="mt-10">
			<h1 className="mb-8 text-3xl">Order: </h1>
			<>{data?.map(item => <UserOrdersCard {...item} />)}</>
		</Container>
	)
}

export default UserOrders
