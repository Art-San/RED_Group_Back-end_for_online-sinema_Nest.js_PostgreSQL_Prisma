import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class RefreshTokenDto {
	@ApiProperty()
	@IsString({
		message: 'Вы не передали токен обновления или это не строка!',
	})
	refreshToken: string
}
