import { ApiProperty } from '@nestjs/swagger'
import {
	IsString,
	IsNumber,
	IsOptional,
	IsBoolean,
	ValidateNested,
} from 'class-validator'
import { Type } from 'class-transformer'

export class Parameters {
	@ApiProperty()
	@IsNumber()
	year: number

	@ApiProperty()
	@IsNumber()
	duration: number

	@ApiProperty()
	@IsString()
	country: string
}

export class MovieDto {
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

	@ApiProperty({ type: Parameters })
	@ValidateNested()
	@Type(() => Parameters)
	@IsOptional()
	parameters?: Parameters

	@ApiProperty({ default: 4 })
	@IsOptional()
	@IsNumber()
	rating?: number

	@ApiProperty()
	@IsString()
	videoUrl: string

	@ApiProperty({ default: 0 })
	@IsOptional()
	@IsNumber()
	countOpened?: number

	@ApiProperty()
	@IsBoolean()
	@IsOptional()
	isSendTelegram?: boolean
}
