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
import { MovieService } from './movie.service'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { ApiOkResponse } from '@nestjs/swagger'
import { MovieDto } from './dto/movie.dto'
import { UpdateMovieDto } from './dto/update.movie.dto'

@Controller('movies')
export class MovieController {
	constructor(private readonly movieService: MovieService) {}

	// @Get('by-slug/:slug')
	// async bySlug(@Param('slug') slug: string) {
	// 	return this.movieService.bySlug(slug)
	// }

	// @Get('by-actor/:actorId')
	// async byActor(@Param('actorId', idValidationPipe) actorId: Types.ObjectId) {
	// 	return this.movieService.byActor(actorId)
	// }
	// нельзя передавать не правильный ID вылетит 500
	// @Post('by-genres')
	// @HttpCode(200)
	// async byGenres(@Body('genreIds') genreIds: Types.ObjectId[]) {
	// 	return this.movieService.byGenres(genreIds)
	// }

	// @Get()
	// async getAll(@Query('searchTerm') searchTerm?: string) {
	// 	return this.movieService.getAll(searchTerm)
	// }
	// @Get('most-popular')
	// async getMostPopular() {
	// 	return this.movieService.getMostPopular()
	// }

	// @Put('update-count-opened')
	// @HttpCode(200)
	// async updateCountOpened(@Body('slug') slug: string) {
	// 	return this.movieService.updateCountOpened(slug)
	// }

	// @Get(':id')
	// @Auth('admin')
	// async get(@Param('id', ParseIntPipe) id: number) {
	// 	return this.movieService.byId(id)
	// }

	// @Post()
	// @HttpCode(200)
	// @Auth('admin')
	// async create() {
	// 	return this.movieService.create()
	// }

	// @Put(':id')
	// @HttpCode(200)
	// @Auth('admin')
	// async update(
	// 	@Param('id', ParseIntPipe) id: number,
	// 	@Body() dto: UpdateMovieDto
	// ) {
	// 	return this.movieService.update(id, dto)
	// }

	// @Delete(':id')
	// @HttpCode(200)
	// @ApiOkResponse({
	// 	type: MovieDto,
	// 	description: 'Фильм успешно удален',
	// })
	// @Auth('admin')
	// async deleteUser(
	// 	@Param('id', ParseIntPipe) id: number
	// ) {
	// 	return this.movieService.delete(id)
	// }
}
