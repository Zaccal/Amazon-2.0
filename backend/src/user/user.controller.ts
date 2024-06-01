import {
	Controller,
	Get,
	Body,
	Param,
	Put,
	HttpCode,
	UsePipes,
	ValidationPipe,
	Patch
} from '@nestjs/common'
import { UserService } from './user.service'
import { UpdateUserDto } from './dto/update-user.dto'
import { Auth } from 'src/auth/decorator/Auth.decorator'
import { CurrentUser } from 'src/auth/decorator/User.decorator'

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get('profile')
	@Auth()
	async getProfile(@CurrentUser('id') userId: number) {
		return this.userService.byId(userId)
	}

	@Auth()
	@HttpCode(200)
	@UsePipes(new ValidationPipe())
	@Put('profile')
	update(@CurrentUser('id') userId, @Body() dto: UpdateUserDto) {
		return this.userService.updateProfile(userId, dto)
	}

	@Auth()
	@HttpCode(200)
	@Patch('/profile/favorites/:productId')
	toggleFavorite(
		@Param('productId') productId: string,
		@CurrentUser('id') userId
	) {
		return this.userService.toggleFavorite(userId, +productId)
	}
}
