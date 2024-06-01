import { Prisma } from '@prisma/client'
import { ArrayMinSize, IsNumber, IsOptional, IsString } from 'class-validator'

export class productDto implements Prisma.ProductUpdateInput {
	@IsString()
	name: string

	@IsNumber()
	price?: number | Prisma.FloatFieldUpdateOperationsInput

	@IsOptional()
	@IsString()
	description?: string | Prisma.StringFieldUpdateOperationsInput

	@IsString({ each: true })
	@ArrayMinSize(1)
	imeges?: Prisma.ProductUpdateimegesInput | string[]

	@IsNumber()
	category?: Prisma.CategoryUpdateOneRequiredWithoutProductNestedInput
}
