import { ApiProperty } from '@nestjs/swagger'

export class ProfileDto {
	@ApiProperty()
	id: number

	@ApiProperty()
	email: string

	@ApiProperty()
	password: string

	@ApiProperty()
	isAdmin: boolean

	@ApiProperty()
	createdAt: string

	@ApiProperty()
	updatedAt: string
}
