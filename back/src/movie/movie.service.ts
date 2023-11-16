import {
	Injectable,
	InternalServerErrorException,
	Logger,
	NotFoundException,
} from '@nestjs/common'
import { DbService } from 'src/db/db.service'
import { Prisma } from '@prisma/client'
import { CreateMovieDto } from './dto/create.movie.dto'
import { UpdateMovieDto } from './dto/update.movie.dto'

// {
//   "poster": "/uploads/movies/mad-max-small.jpg",
//   "bigPoster": "/uploads/movies/mad-max.jpg",
//   "title": "Mad Max",
//   "slug": "mad-max",
//   "parameters": {
//     "year": 2007,
//     "duration": 123,
//     "country": "usa"
//   },
//   "videoUrl": "/uploads/movies/mad-max.mp4",
//   "genres": [ "6512a844b92fe5d76099c30f"],
//   "actors": ["65159539658dc2b9e6df416a"]
// }

@Injectable()
export class MovieService {
	private readonly logger = new Logger(MovieService.name)
	constructor(private db: DbService) {}

	async create() {
		try {
			const defaultValue: CreateMovieDto = {
				poster: '',
				bigPoster: '',
				title: '',
				slug: '',
				year: 0,
				duration: 0,
				country: '',
				videoUrl: '',
			}
			const actor = await this.db.movie.create({
				data: defaultValue,
			})
			return actor.id
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				if (error.code === 'P2002') {
					throw new NotFoundException('Значение slug должен быть уникальным')
				}
			}
			this.logger.error(
				`Произошла ошибка во время создания фильма`,
				error.stack,
				'MovieService.create'
			)
			throw new InternalServerErrorException(
				'Произошла непонятная ошибка в базе данных, при создании фильма',
				error
			)
		}
	}

	// /*FIXME: Пытаюсь разобраться*/
	async update(id: number, dto: UpdateMovieDto) {
		try {
			const updatedMovie = await this.db.movie.update({
				where: { id },
				data: dto,
			})

			return updatedMovie
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				if (error.code === 'P2002') {
					throw new NotFoundException('Значение slug уже занят')
				}
			}
			// P2002: Ошибка уникального ограничения (Unique constraint violation).
			// P2003: Ошибка ограничения внешнего ключа (Foreign key constraint violation).
			// P2025: Нарушение ограничения уникальности (Unique constraint violation).
			// P2000: Общая ошибка базы данных

			this.logger.error(
				`Произошла ошибка во время обновления фильма`,
				error.stack,
				'MovieService.update'
			)
			throw new InternalServerErrorException(
				'Произошла непонятная ошибка в базе данных, при обновление фильма ',
				error
			)
		}
	}
}
