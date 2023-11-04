import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { AuthDto } from './dto/auth.dto'
import { RefreshTokenDto } from './dto/refreshToken.dto'

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	// REGISTER
	@Post('register')
	@ApiCreatedResponse({ description: 'Пользователь успешно создан.' })
	async register(@Body() dto: AuthDto) {
		return this.authService.register(dto)
	}

	// LOGIN
	@Post('login')
	@ApiOkResponse({ description: 'Вы вошли в систему' })
	@HttpCode(HttpStatus.OK)
	async login(@Body() dto: AuthDto) {
		// console.log(dto)
		return this.authService.login(dto)
	}

	// ПОЛУЧЕНИЕ НОВОГО ТОКЕНА
	@HttpCode(200)
	@Post('login/access-token')
	async getNewTokens(@Body() dto: RefreshTokenDto) {
		return this.authService.getNewTokens(dto)
	}
}
