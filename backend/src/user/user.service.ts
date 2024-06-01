import {
	BadRequestException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { hash } from 'argon2'
import { PrismaService } from 'src/prisma.service'
import { UpdateUserDto } from './dto/update-user.dto'
import { returnUserObject } from './returns/return-user.object'

@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) {}
	private user = this.prisma.user

	async byId(id: number, selectObject: Prisma.UserSelect = {}) {
		const user = await this.user.findUnique({
			where: {
				id
			},
			select: {
				...returnUserObject,
				favorites: {
					select: {
						id: true,
						name: true,
						price: true,
						imeges: true,
						slug: true,
						sku: true
					}
				},
				...selectObject
			}
		})

		if (!user) throw new NotFoundException('User not found.')

		return user
	}

	async updateProfile(userId: number, dto: UpdateUserDto) {
		const isSameUser = await this.user.findUnique({
			where: {
				email: dto.email
			}
		})

		if (isSameUser && userId !== isSameUser.id) {
			throw new BadRequestException('Email already in use')
		}

		const user = await this.byId(userId)

		this.user.update({
			where: {
				id: userId
			},
			data: {
				email: dto.email,
				name: dto.name,
				avatarPath: dto.avatarPath,
				phone: dto.phone,
				password: dto.password
					? await hash(dto.password)
					: user.password
			}
		})

		return user
	}

	async toggleFavorite(userId: number, productId: number) {
		const user = await this.byId(userId)

		if (!user) throw new NotFoundException('User not found.')

		const isExist = user.favorites.some(data => data.id === productId)

		await this.user.update({
			where: {
				id: userId
			},
			data: {
				favorites: {
					[isExist ? 'disconnect' : 'connect']: {
						id: productId
					}
				}
			}
		})

		return {
			message: isExist
				? 'Product removed from favorites successfully.'
				: 'Product added to favorites successfully.'
		}
	}
}
