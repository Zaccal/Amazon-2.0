import {
	Body,
	Controller,
	Get,
	HttpCode,
	Post,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { Auth } from 'src/auth/decorator/Auth.decorator'
import { CurrentUser } from 'src/auth/decorator/User.decorator'
import { OrderDto } from './dto/orderDto'
import { PaymentStatusDto } from './dto/paymentStatusDto'
import { OrderService } from './order.service'

@Controller('order')
export class OrderController {
	constructor(private readonly orderService: OrderService) {}

	@Get()
	@Auth()
	getAll(@CurrentUser('id') id: number) {
		return this.orderService.getAll(id)
	}

	@Post()
	@HttpCode(200)
	@UsePipes(new ValidationPipe())
	@Auth()
	async placeOrder(@Body() dto: OrderDto, @CurrentUser('id') userId: number) {
		return await this.orderService.placeOrder(dto, userId)
	}

	@HttpCode(200)
	@Post('status')
	async updateStatus(@Body() dto: PaymentStatusDto) {
		return this.orderService.updateStatus(dto)
	}
}
