import { Body, Controller, HttpCode, Post } from '@nestjs/common'
import { ApiCreatedResponse } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { AuthDto } from './dto/auth.dto'

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	// REGISTER
	@Post('register')
	@HttpCode(200)
	@ApiCreatedResponse()
	async register(@Body() dto: AuthDto) {
		return this.authService.register(dto)
	}
}
