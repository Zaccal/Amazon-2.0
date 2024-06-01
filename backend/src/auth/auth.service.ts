import { Injectable, UnauthorizedException } from '@nestjs/common'
import { authDto } from './dto/auth.dto'
import { PrismaService } from 'src/prisma.service'
import { faker } from '@faker-js/faker'
import { hash, verify } from 'argon2'
import { JwtService } from '@nestjs/jwt'
import { User } from '@prisma/client'

interface ITokens {
	accessToken: string
	refreshToken: string
}

@Injectable()
export class AuthService {
	constructor(
		private prisma: PrismaService,
		private jwt: JwtService
	) {}
	private user = this.prisma.user

	async register(dto: authDto) {
		const user = await this.validateUserToRegister(dto)

		const hashedPassword = await hash(user.password)

		const newUser = await this.user.create({
			data: {
				email: user.email,
				name: faker.name.firstName(),
				avatarPath: faker.image.avatar(),
				phone: `+77${faker.phone.number()}`,
				password: hashedPassword
			}
		})

		const tokens = await this.issueTokens(newUser.id)

		return this.returnFieldsResultUser(newUser, tokens)
	}

	private async issueTokens(userId: number) {
		const data = {
			id: userId
		}

		const accessToken = this.jwt.sign(data, {
			expiresIn: '1h'
		})

		const refreshToken = this.jwt.sign(data, {
			expiresIn: '7d'
		})

		return { accessToken, refreshToken }
	}

	private returnFieldsUser(user: User) {
		return {
			id: user.id,
			email: user.email
		}
	}

	private returnFieldsResultUser(user: User, tokens: ITokens) {
		return {
			user: this.returnFieldsUser(user),
			...tokens
		}
	}

	private async validateUserToRegister(userRegister: authDto) {
		const oldUser = await this.user.findUnique({
			where: {
				email: userRegister.email
			}
		})

		if (oldUser) throw new UnauthorizedException('User already exist.')

		return userRegister
	}

	private async validateUserToLogin(userLogin: authDto) {
		const user = await this.user.findUnique({
			where: {
				email: userLogin.email
			}
		})
		if (!user) throw new UnauthorizedException('User not found.')

		const isValid = await verify(user.password, userLogin.password)
		if (!isValid) throw new UnauthorizedException('Invalid password.')

		return user
	}

	async login(dto: authDto) {
		const user = await this.validateUserToLogin(dto)
		const tokens = await this.issueTokens(user.id)

		return this.returnFieldsResultUser(user, tokens)
	}

	async getNewTokens(token: string) {
		const result = await this.jwt.verifyAsync(token)
		if (!result) throw new UnauthorizedException('Invalid refresh token.')

		const user = await this.user.findUnique({
			where: {
				id: result.id
			}
		})

		const tokens = await this.issueTokens(user.id)

		return this.returnFieldsResultUser(user, tokens)
	}
}
