import {
	Body,
	Controller,
	HttpCode,
	Post,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { authDto } from './dto/auth.dto'
import { refreshTokenDto } from './dto/refresh-token.dto'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@HttpCode(200)
	@Post('register')
	@UsePipes(new ValidationPipe())
	async register(@Body() dto: authDto) {
		return await this.authService.register(dto)
	}

	@HttpCode(200)
	@Post('login')
	@UsePipes(new ValidationPipe())
	async login(@Body() dto: authDto) {
		return await this.authService.login(dto)
	}

	@HttpCode(200)
	@Post('login/access_token')
	@UsePipes(new ValidationPipe())
	async getNewTokens(@Body() dto: refreshTokenDto) {
		return await this.authService.getNewTokens(dto.refreshToken)
	}
}
