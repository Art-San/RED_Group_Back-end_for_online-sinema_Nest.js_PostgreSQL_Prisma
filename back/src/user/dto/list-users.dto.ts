import { ApiProperty } from '@nestjs/swagger'

export class ListUsersDto {
	@ApiProperty()
	id: number

	@ApiProperty()
	email: string

	@ApiProperty()
	isAdmin: boolean

	@ApiProperty()
	createdAt: string
}
