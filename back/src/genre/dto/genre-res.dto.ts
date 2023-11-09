import { ApiProperty } from '@nestjs/swagger'

export class GenreResDto {
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
}
