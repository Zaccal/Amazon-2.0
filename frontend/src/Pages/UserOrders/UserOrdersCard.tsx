import {
	Accordion,
	AccordionItem,
	Card,
	CardBody,
	CardHeader
} from '@nextui-org/react'
import { EnumOrderStatus, IOrder } from '../../types/order.interface'
import UserOrdersProductCard from './UserOrdersProductCard'

const getStatusColor = (status: EnumOrderStatus): string => {
	switch (status) {
		case EnumOrderStatus.SHIPPED:
			return 'text-success-500'
		case EnumOrderStatus.PENDING:
			return 'text-muted'
		case EnumOrderStatus.DELAYED:
			return 'text-warning'
		case EnumOrderStatus.DELIVERED:
			return 'text-success-500'
		case EnumOrderStatus.CANCELED:
			return 'text-red-500'
	}
}

const UserOrdersCard = ({ items, status, total }: IOrder) => {
	return (
		<Card className="w-full mt-5">
			<CardHeader className="flex items-center justify-between">
				<p className={`text-2xl ${getStatusColor(status)}`}>{status}</p>
				<p className="text-2xl text-accent ">${total}</p>
			</CardHeader>
			<CardBody>
				<Accordion>
					<AccordionItem
						key="1"
						aria-label="Products"
						title="Products"
					>
						{items.map(itemData => (
							<UserOrdersProductCard {...itemData} />
						))}
					</AccordionItem>
				</Accordion>
			</CardBody>
		</Card>
	)
}

export default UserOrdersCard
