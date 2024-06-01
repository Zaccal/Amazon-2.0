import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { Auth } from 'src/auth/decorator/Auth.decorator'
import { CurrentUser } from 'src/auth/decorator/User.decorator'
import { reviewDto } from './dto/reviewDto'
import { ReviewService } from './review.service'

@Controller('review')
export class ReviewController {
	constructor(private readonly reviewService: ReviewService) {}

	@Get()
	getAll() {
		return this.reviewService.getAll()
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('leave/:productId')
	@Auth()
	leavePreview(
		@Param('productId') productId: string,
		@CurrentUser('id') userId: number,
		@Body() dto: reviewDto
	) {
		return this.reviewService.create(userId, dto, +productId)
	}

	@Get('product-rating/:productId')
	getAvarageValue(@Param('productId') productId: string) {
		return this.reviewService.getAvarageValueByProductId(+productId)
	}

	@Delete(':reviewId')
	delete(@Param('reviewId') reviewId: string) {
		return this.reviewService.delete(+reviewId)
	}
}
