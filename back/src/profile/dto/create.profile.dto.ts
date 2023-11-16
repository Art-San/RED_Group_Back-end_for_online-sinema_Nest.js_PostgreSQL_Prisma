import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class CreateProfileDto {
	@IsString()
	familyStatus: string

	@IsString()
	car: string
}
