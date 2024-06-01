import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { reviewDto } from './dto/reviewDto'
import { returnReviewObject } from './return-review.object'

@Injectable()
export class ReviewService {
	constructor(private prisma: PrismaService) {}
	private review = this.prisma.review

	async getAll() {
		return await this.review.findMany({
			orderBy: {
				createdAt: 'desc'
			},
			select: returnReviewObject
		})
	}

	async create(userId: number, dto: reviewDto, productId: number) {
		const product = await this.prisma.product.findUnique({
			where: {
				id: productId
			}
		})

		if (!product) throw new NotFoundException('This product not found.')

		return await this.review.create({
			data: {
				...dto,
				product: {
					connect: {
						id: productId
					}
				},
				user: {
					connect: {
						id: userId
					}
				}
			}
		})
	}

	async getAvarageValueByProductId(productId: number) {
		return await this.review
			.aggregate({
				where: {
					productId
				},
				_avg: { rating: true }
			})
			.then(data => data._avg)
	}

	async delete(id: number) {
		return await this.review.delete({
			where: {
				id
			}
		})
	}
}
