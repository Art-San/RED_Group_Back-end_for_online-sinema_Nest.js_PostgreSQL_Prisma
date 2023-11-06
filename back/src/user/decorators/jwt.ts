import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'

const token =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEwIiwiaWF0IjoxNjk5MjYwNjM2LCJleHAiOjE2OTkyNjQyMzZ9.YA-WBXMKvutHB30GEPJvkpa-hdmEQPhS6WPcM3xZCfY'

@Injectable()
export class AuthService {
	constructor(
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService
	) {}

	async verifyToken(token: string) {
		try {
			const decodedToken = await this.jwtService.verifyAsync(token, {
				secret: this.configService.get('JWT_SECRET'),
			})
			console.log('decodedToken', decodedToken)
			return decodedToken
		} catch (error) {
			throw new UnauthorizedException({ message: 'Ошибка аутентификации' })
		}
	}
}

// const authService = new AuthService();
// const decodedToken = authService.verifyToken(token);
// console.log(decodedToken.id); // Это ID пользователя
