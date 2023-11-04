import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { AuthDto } from './dto/auth.dto'

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	// LOGIN
	@Post('login')
	@ApiOkResponse()
	@HttpCode(HttpStatus.OK)
	async login(@Body() dto: AuthDto) {
		// console.log(dto)
		return this.authService.login(dto)
	}

	// REGISTER
	@Post('register')
	// @HttpCode(200)
	@ApiCreatedResponse()
	async register(@Body() dto: AuthDto) {
		return this.authService.register(dto)
	}
}
