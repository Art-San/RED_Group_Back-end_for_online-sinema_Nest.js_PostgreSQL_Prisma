import {
	Body,
	Controller,
	Get,
	HttpCode,
	Param,
	ParseIntPipe,
	Post,
	Put,
} from '@nestjs/common'
import {
	ApiBearerAuth,
	ApiCreatedResponse,
	ApiResponse,
	ApiTags,
} from '@nestjs/swagger'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CreateGenreDto } from './dto/create-genre.dto'
import { GenreDto } from './dto/genre.dto'

import { GenreService } from './genre.service'

@ApiTags('Genres')
@Controller('genres')
export class GenreController {
	constructor(private readonly genreService: GenreService) {}

	@Get('by-slug/:slug')
	async bySlug(@Param('slug') slug: string) {
		return this.genreService.bySlug(slug)
	}

	/*Admin place*/
	@ApiBearerAuth()
	@Get(':id')
	@ApiResponse({
		type: GenreDto,
	})
	@Auth('admin')
	async get(@Param('id', ParseIntPipe) id: number) {
		return this.genreService.byId(id)
	}

	@ApiBearerAuth()
	@Post()
	@ApiCreatedResponse({ description: 'Создался пустой жанр, вернулся ID' })
	@HttpCode(200)
	@Auth('admin')
	async create() {
		return this.genreService.create()
	}

	@ApiBearerAuth()
	@Put(':id')
	@HttpCode(200)
	@ApiResponse({
		type: GenreDto,
	})
	@Auth('admin')
	async update(
		@Param('id', ParseIntPipe) id: number,
		@Body() dto: CreateGenreDto
	) {
		return this.genreService.update(id, dto)
	}
}
