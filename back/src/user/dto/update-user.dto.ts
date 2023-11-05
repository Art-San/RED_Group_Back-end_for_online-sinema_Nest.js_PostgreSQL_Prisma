import { IsEmail, IsBoolean, IsOptional, MinLength } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class UpdateUserDto {
	@ApiProperty()
	@IsEmail()
	email: string

	@ApiProperty({ required: false })
	@IsOptional()
	@MinLength(6, {
		message: 'Пароль должен содержать не менее 6 символов',
	})
	password?: string

	@ApiProperty({ required: false })
	@IsBoolean()
	@IsOptional()
	isAdmin?: boolean
}
