import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { UserService } from 'src/user/user.service'

@Injectable()
export class StatisticService {
	constructor(
		private prisma: PrismaService,
		private userService: UserService
	) {}

	async getMain(userId: number) {
		const user = await this.userService.byId(userId, {
			orders: {
				select: {
					items: true
				}
			},
			reviews: true
		})

		const totalAmount = await this.prisma.$queryRaw`
            SELECT
                o.id AS order_id,
                SUM(oi.quantity * p.price) AS total_price
            FROM
                "Order" o
            JOIN
                "OrderItem" oi ON oi.order_id = o.id
            JOIN
                "Product" p ON p.id = oi.product_id
            GROUP BY
                o.id;
        `

		return [
			{
				name: 'Orders',
				value: user.orders.length
			},
			{
				name: 'Reviews',
				value: user.reviews.length
			},
			{
				name: 'Favorites',
				value: user.favorites.length
			},
			{
				name: 'Total amount',
				value: totalAmount
			}
		]
	}
}
