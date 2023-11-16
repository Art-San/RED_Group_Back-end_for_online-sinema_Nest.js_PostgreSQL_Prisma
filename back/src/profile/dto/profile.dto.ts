import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class ProfileDto {
	@IsString()
	familyStatus?: string

	@IsString()
	car: string
}
