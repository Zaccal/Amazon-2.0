import { IsEmail, IsString, MinLength } from 'class-validator'

export class authDto {
	@IsEmail()
	email: string

	@MinLength(8, {
		message: 'Password must be at least 6 chrachters long'
	})
	@IsString()
	password: string
}
