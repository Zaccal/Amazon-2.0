import { EnumOrderStatus } from '@prisma/client'
import { Type } from 'class-transformer'
import {
	ArrayMinSize,
	IsEnum,
	IsNumber,
	IsOptional,
	ValidateNested
} from 'class-validator'

export class OrderDto {
	@IsOptional()
	@IsEnum(EnumOrderStatus)
	status: EnumOrderStatus

	@ArrayMinSize(1)
	@ValidateNested({ each: true })
	@Type(() => OrderItemDto)
	items: OrderItemDto[]
}

export class OrderItemDto {
	@IsNumber()
	quantity: number

	@IsNumber()
	price: number

	@IsNumber()
	productId: number
}
