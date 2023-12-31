import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class UpdateProfileDto {
	@IsString()
	familyStatus: string

	@IsString()
	car: string
}
