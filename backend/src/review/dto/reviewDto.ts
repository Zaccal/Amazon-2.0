import { IsNumber, IsString } from 'class-validator'

export class reviewDto {
	@IsString()
	text: string

	@IsNumber()
	rating: number
}
