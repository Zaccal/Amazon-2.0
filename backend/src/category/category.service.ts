import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { generateSlug } from 'src/utils/generate-slug'
import { categoryDto } from './dto/category.dto'
import { returnCategoryObject } from './return-category.object'

@Injectable()
export class CategoryService {
	constructor(private prisma: PrismaService) {}
	private category = this.prisma.category

	async getAll() {
		return await this.category.findMany({
			select: returnCategoryObject
		})
	}

	async getBy(id: string | number) {
		if (!isNaN(id as number)) {
			const category = await this.category.findUnique({
				where: {
					id: +id
				},
				select: returnCategoryObject
			})

			if (!category) throw new NotFoundException('Category not found.')

			return category
		}

		const category = await this.category.findUnique({
			where: {
				slag: id + ''
			},
			select: returnCategoryObject
		})

		if (!category) throw new NotFoundException('Category not found.')

		return category
	}

	async create() {
		return await this.category.create({
			data: {
				name: '',
				slag: ''
			}
		})
	}

	async update(id: number, dto: categoryDto) {
		return await this.category.update({
			where: {
				id
			},
			data: {
				name: dto.name,
				slag: generateSlug(dto.name)
			}
		})
	}

	async delete(id: number) {
		return await this.category.delete({
			where: {
				id
			}
		})
	}
}
