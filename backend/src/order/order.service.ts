import { Injectable } from '@nestjs/common'
import { EnumOrderStatus } from '@prisma/client'
import { PrismaService } from 'src/prisma.service'
import { productReturnObject } from 'src/product/return-product.object'
import * as YooKassa from 'yookassa'
import { OrderDto } from './dto/orderDto'
import { PaymentStatusDto } from './dto/paymentStatusDto'

const yooKassa = new YooKassa({
	shopId: process.env.SHOP_ID,
	secretKey: process.env.PAYMENT_TOKEN
})

@Injectable()
export class OrderService {
	constructor(private prisma: PrismaService) {}
	private orders = this.prisma.order

	async getAll(userId: number) {
		const orders = await this.orders.findMany({
			where: {
				userId
			},
			orderBy: {
				createdAt: 'desc'
			},
			include: {
				items: {
					include: {
						product: {
							select: productReturnObject
						}
					}
				}
			}
		})

		return orders
	}

	async placeOrder(dto: OrderDto, userId: number) {
		const items = dto.items.map(item => ({
			price: item.price,
			quantity: item.quantity,
			productId: item.productId
		}))

		const totalPrice: number = items.reduce((acc, item) => {
			return acc + item.price * item.quantity
		}, 0)

		const order = await this.orders.create({
			data: {
				status: dto.status,
				items: {
					create: items
				},
				total: totalPrice,
				user: {
					connect: {
						id: userId
					}
				}
			}
		})

		const payment = await yooKassa.createPayment({
			amount: {
				value: totalPrice.toFixed(2),
				currency: 'RUB'
			},
			payment_method_data: {
				type: 'bank_card'
			},
			confirmation: {
				type: 'redirect',
				return_url: 'http://localhost:5173/thanks'
			},
			description: `Order ${order.id}`
		})

		return payment
	}

	private async updateOrderStatus(id: number, status: EnumOrderStatus) {
		const order = await this.orders.update({
			data: {
				status: status
			},
			where: {
				id: id
			}
		})

		return order
	}

	async updateStatus(dto: PaymentStatusDto) {
		if (dto.event === 'payment.waiting_for_capture') {
			const payment = await yooKassa.capturePayment(dto.object.id)
			return payment
		}

		if (dto.event === 'payment.succeeded') {
			const idOrder = Number(dto.object.description.split(' ')[1])
			await this.updateOrderStatus(idOrder, 'SHIPPED')

			return true
		}
	}
}
