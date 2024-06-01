import { ICartItem } from './cart.interface'
import { IUser } from './user.interface'

export const enum EnumOrderStatus {
	PENDING = 'PENDING',
	DELAYED = 'DELAYED',
	SHIPPED = 'SHIPPED',
	DELIVERED = 'DELIVERED',
	CANCELED = 'CANCELED'
}

export interface IOrder {
	id: number
	createdAt: string
	items: ICartItem[]
	status: EnumOrderStatus
	total: number
	user: IUser
}

interface Amount {
	value: string
	currency: string
}

interface Recipient {
	account_id: string
	gateway_id: string
}

interface PaymentMethod {
	type: string
	id: string
	saved: boolean
}

interface Confirmation {
	type: string
	return_url: string
	confirmation_url: string
}

interface Instance {
	shopId: string
	secretKey: string
	apiUrl: string
	debug: boolean
	timeout: number
	retryDelay: number
}

export interface Payment {
	id: string
	status: string
	amount: Amount
	description: string
	recipient: Recipient
	payment_method: PaymentMethod
	created_at: string
	confirmation: Confirmation
	test: boolean
	paid: boolean
	refundable: boolean
	metadata: Record<string, any>
	_instance: Instance
}

export interface IOrderPostItem {
	price: number
	productId: number
	quantity: number
}

export interface IOrderPost {
	items: IOrderPostItem[]
}
