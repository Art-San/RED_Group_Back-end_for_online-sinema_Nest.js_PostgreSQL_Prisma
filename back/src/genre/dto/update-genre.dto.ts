import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class UpdateGenreDto {
	@ApiProperty()
	@IsString()
	name: string

	@ApiProperty()
	@IsString()
	slug: string

	@ApiProperty()
	@IsString()
	description: string

	@ApiProperty()
	@IsString()
	icon: string
}
