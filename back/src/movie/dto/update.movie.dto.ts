import { Type } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'
import {
	IsArray,
	IsBoolean,
	IsNumber,
	IsObject,
	IsOptional,
	IsString,
	ValidateNested,
} from 'class-validator'

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

export class UpdateMovieDto {
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

	@ApiProperty()
	@IsString()
	videoUrl: string

	@ApiProperty()
	@IsArray() // Будет массив
	@IsString({ each: true }) // Каждый элемент массива строка
	genres: string[]

	@ApiProperty()
	@IsArray()
	@IsString({ each: true })
	actors: string[]

	isSendTelegram?: boolean
}
