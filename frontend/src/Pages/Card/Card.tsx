import { Button, Checkbox, CheckboxGroup } from '@nextui-org/react'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Container from '../../Components/Container/Container'
import { queryClientProvider } from '../../Providers/Providers'
import useActions from '../../hooks/useActions'
import { useAuth } from '../../hooks/useAuth'
import useTypedSelector from '../../hooks/useTypedSelector'
import OrderService from '../../service/Order/Order.service'
import { IOrderPostItem } from '../../types/order.interface'
import CardHeader from './CardHeader'
import CardTable from './CardTable'
import CartTableItem from './CartTableItem'
import DiscountCode from './DiscountCode'

const Card = () => {
	const { items } = useTypedSelector(state => state.card)
	const { reset } = useActions()
	const [totalCost, setTotalCost] = useState(() =>
		items.reduce((acc, item) => acc + item.price, 0)
	)
	const nav = useNavigate()
	const [discount, setDiscount] = useState(0)
	const { user } = useAuth()
	const order = useMutation({
		mutationFn: OrderService.placeOrder,
		onSuccess: () => {
			reset()
			queryClientProvider.invalidateQueries({ queryKey: ['orders'] })
			nav('/thanks')
		}
	})

	return (
		<Container size="6xl" className="pt-4">
			<div className="grid grid-cols-8 gap-8 grid-rows-3 items-start">
				<div className="col-span-6 row-span-3 rounded-lg border border-muted py-5 px-3">
					<CardHeader />
					<CardTable>
						{items.map(item => (
							<CartTableItem {...item} key={item.id} />
						))}
					</CardTable>
					{!items.length && (
						<p className="text-muted text-3xl text-center mt-4 mb-2">
							Card is empty
						</p>
					)}
				</div>
				<div
					style={{
						gridColumn: '7 / 9',
						gridRow: '1 / 3'
					}}
					className="rounded-lg border border-muted py-5 px-3"
				>
					<p className="mb-4">
						Email: <span className="font-bold">{user?.email}</span>
					</p>
					<p className="mb-4">
						Currency: <span className="font-bold">RUS / ₽</span>
					</p>
					<CheckboxGroup
						orientation="horizontal"
						defaultValue={['delivery']}
						isRequired
						label="Select get by:"
					>
						<Checkbox value={'pickup'} className="uppercase">
							Pickup
						</Checkbox>
						<Checkbox
							classNames={{
								base: 'ml-4'
							}}
							value={'delivery'}
							className="uppercase"
						>
							Delivery
						</Checkbox>
					</CheckboxGroup>

					<DiscountCode
						setDiscountValue={setDiscount}
						setTotalCost={setTotalCost}
						totalCost={totalCost}
					/>

					<div className="mt-5 flex items-center gap-10">
						<p>Discount: {discount}</p>
						<p>
							Total:{' '}
							<span className="font-bold text-warning-500">
								$
								{items.reduce(
									(acc, item) => acc + item.price,
									0
								)}{' '}
								{discount
									? ` - $${discount} = $${totalCost}`
									: ''}
							</span>
						</p>
					</div>
					<Button
						onClick={() => {
							const newOrders: IOrderPostItem[] = items.map(
								item => ({
									price: item.price,
									productId: item.product.id,
									quantity: item.quantity
								})
							)

							order.mutate({
								items: newOrders
							})
						}}
						className="mt-5 w-full"
					>
						ORDER
					</Button>
				</div>
			</div>
		</Container>
	)
}

export default Card
