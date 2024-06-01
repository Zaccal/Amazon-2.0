import { instense } from '../../api/api.interceptor'
import { EnumUrl } from '../../config/url.config'
import { IOrder, IOrderPost, Payment } from '../../types/order.interface'

class Order {
	getAll() {
		return instense<IOrder[]>({
			url: EnumUrl.order,
			method: 'GET'
		})
	}

	placeOrder(data: IOrderPost) {
		return instense<Payment>({
			url: EnumUrl.order,
			method: 'POST',
			data
		})
	}
}

export default new Order()
