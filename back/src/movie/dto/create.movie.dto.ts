import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator'

export class CreateMovieDto {
	@ApiProperty()
	@IsString()
	poster: string

	@ApiProperty()
	@IsString()
	bigPoster: string

	@ApiProperty()
	@IsString()
	title: string

	@ApiProperty()
	@IsString()
	slug: string

	@ApiProperty()
	@IsNumber()
	year: number

	@ApiProperty()
	@IsNumber()
	duration: number

	@ApiProperty()
	@IsString()
	country: string

	@ApiProperty()
	@IsString()
	videoUrl: string

	// @ApiProperty()
	// @IsArray()
	// @IsString({ each: true })
	// genres: string[]

	// @ApiProperty()
	// @IsArray()
	// @IsString({ each: true })
	// actors: string[]

	@ApiProperty()
	@IsOptional()
	isSendTelegram?: boolean
}
