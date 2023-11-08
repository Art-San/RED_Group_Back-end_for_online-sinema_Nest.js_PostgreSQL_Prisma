import { ApiProperty } from '@nestjs/swagger'

export class GenreDto {
	@ApiProperty()
	name: string

	@ApiProperty()
	slug: string

	@ApiProperty()
	description: string

	@ApiProperty()
	icon: string

	@ApiProperty()
	createdAt: string

	@ApiProperty()
	updatedAt: string
}
