import { Injectable, NotFoundException } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PaginationService } from 'src/pagination/pagination.service'
import { PrismaService } from 'src/prisma.service'
import { EnumProductSort, GetAllProductsDto } from './dto/getAllProductsDto'
import {
	productReturnObject,
	productReturnObjectFullest
} from './return-product.object'

@Injectable()
export class ProductService {
	constructor(
		private prisma: PrismaService,
		private paginationService: PaginationService
	) {}
	private product = this.prisma.product

	async getAll(dto: GetAllProductsDto) {
		const { searchTerm, sort } = dto

		const prismaSort: Prisma.ProductOrderByWithRelationInput[] = []

		if (sort === EnumProductSort.LOW_PRICE)
			prismaSort.push({ price: 'asc' })
		else if (sort === EnumProductSort.HIGH_PRICE)
			prismaSort.push({ price: 'desc' })
		else if (sort === EnumProductSort.OLDEST)
			prismaSort.push({ createdAt: 'asc' })
		else prismaSort.push({ createdAt: 'desc' })

		const prismaSearchTermFilter: Prisma.ProductWhereInput = searchTerm
			? {
					OR: [
						{
							category: {
								name: {
									contains: searchTerm,
									mode: 'insensitive'
								}
							}
						},
						{
							name: {
								contains: searchTerm,
								mode: 'insensitive'
							}
						},
						{
							sku: {
								contains: searchTerm
							}
						}
					]
				}
			: {}

		const { perPage, skip } = this.paginationService.getPagination(dto)

		const products = await this.product.findMany({
			where: prismaSearchTermFilter,
			orderBy: prismaSort,
			skip,
			take: perPage
		})

		if (!products.length) throw new NotFoundException('Products not found.')

		return products
	}

	private async getById(id: number) {
		const product = await this.product.findUnique({
			where: {
				id: id
			},
			select: productReturnObjectFullest
		})

		if (!product) throw new NotFoundException('Product not found.')

		return product
	}

	private async getBySlug(slug: string) {
		const product = await this.product.findUnique({
			where: {
				slug: slug
			},
			select: productReturnObjectFullest
		})

		if (!product) throw new NotFoundException('Product not found.')

		return product
	}

	private async getBySku(sku: string) {
		const product = await this.product.findUnique({
			where: {
				sku
			}
		})

		if (!product) throw new NotFoundException('Product not found.')

		return product
	}

	async getBy(id: string | number) {
		if (!isNaN(id as number)) {
			if (id.toString().length >= 5) {
				return await this.getBySku(id + '')
			}

			return await this.getById(+id)
		}

		return await this.getBySlug(id + '')
	}

	async getByCategory(categorySlug: string) {
		const products = await this.product.findMany({
			where: {
				category: {
					slag: categorySlug
				}
			}
		})

		if (!products) throw new NotFoundException('Products not found.')

		return products
	}

	async getSimilar(id: number) {
		const currentProduct = await this.getById(id)

		if (!currentProduct)
			throw new NotFoundException('Current product not found')

		const products = await this.product.findMany({
			where: {
				category: {
					name: currentProduct.category.name
				},
				NOT: {
					id: currentProduct.id
				}
			},
			orderBy: {
				createdAt: 'desc'
			},
			select: productReturnObject
		})

		return products
	}

	// async create() {}

	async delete(id: number) {
		return await this.product.delete({
			where: {
				id
			}
		})
	}
}
