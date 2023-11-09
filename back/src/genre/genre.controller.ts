import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	ParseIntPipe,
	Post,
	Put,
	Query,
} from '@nestjs/common'
import {
	ApiBearerAuth,
	ApiCreatedResponse,
	ApiOkResponse,
	ApiResponse,
	ApiTags,
} from '@nestjs/swagger'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CreateGenreDto } from './dto/create-genre.dto'
import { GenreResDto } from './dto/genre-res.dto'
import { GenreDto } from './dto/genre.dto'

import { GenreService } from './genre.service'

@ApiTags('Genres')
@Controller('genres')
export class GenreController {
	constructor(private readonly genreService: GenreService) {}

	@Get('by-slug/:slug')
	@ApiResponse({
		type: GenreDto,
	})
	async bySlug(@Param('slug') slug: string) {
		return this.genreService.bySlug(slug)
	}

	/*TODO: не реализован*/
	@Get('collections')
	async getCollections() {
		return this.genreService.getCollections()
	}

	@Get()
	@ApiResponse({
		type: GenreResDto,
	})
	async getAll(
		@Query('searchTerm') searchTerm?: string
	): Promise<GenreResDto[]> {
		return this.genreService.getAll(searchTerm)
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

	@ApiBearerAuth()
	@Delete(':id')
	@ApiOkResponse({
		type: GenreDto,
		description: 'Жанр успешно удален',
	})
	@HttpCode(200)
	@Auth('admin')
	async deleteUser(@Param('id', ParseIntPipe) id: number) {
		return this.genreService.delete(id)
	}
}
