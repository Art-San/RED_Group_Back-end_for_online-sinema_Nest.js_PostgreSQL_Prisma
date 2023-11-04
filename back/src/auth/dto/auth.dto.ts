import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString, MinLength } from 'class-validator'

export class AuthDto {
	@ApiProperty({
		example: 'test@email.ru',
	})
	@IsEmail()
	email: string

	@ApiProperty({
		example: '123456',
	})
	@MinLength(6, {
		message: 'Пароль должен содержать не менее 6 символов',
	})
	@IsString()
	password: string
}
