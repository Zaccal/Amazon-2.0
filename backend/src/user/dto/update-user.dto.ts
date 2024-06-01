import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator'

export class UpdateUserDto {
	@IsEmail()
	email: string

	@IsOptional()
	@IsString()
	@MinLength(6, {
		message: 'Password must be at least 6 chrachters long'
	})
	password?: string

	@IsOptional()
	@IsString()
	name: string

	@IsOptional()
	@IsString()
	phone: string

	@IsOptional()
	@IsString()
	avatarPath?: string
}
