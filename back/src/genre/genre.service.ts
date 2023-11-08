import {
	HttpException,
	HttpStatus,
	Injectable,
	InternalServerErrorException,
	NotFoundException,
} from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { DbService } from 'src/db/db.service'
import { CreateGenreDto } from './dto/create-genre.dto'

@Injectable()
export class GenreService {
	constructor(private db: DbService) {}

	// async bySlug(slug: string) {
	// 	const doc = await this.genreModel.findOne({ slug }).exec() // DOC - универсальное обозначение
	// 	if (!doc) {
	// 		throw new NotFoundException('По слагу Genre не найден')
	// 	}
	// 	return doc
	// }

	/*Admin place*/

	async byId(id: number) {
		const genre = await this.db.genre.findUnique({
			where: { id: id },
		})
		if (!genre) {
			throw new NotFoundException('Жанр не найден')
		}
		return genre
	}

	async create() {
		try {
			const defaultValue = {
				name: '',
				slug: '',
				description: '',
				icon: '',
			}

			const genre = await this.db.genre.create({
				data: defaultValue,
			})

			return genre.id
		} catch (error) {
			throw new HttpException(
				'Ошибка создания жанра',
				HttpStatus.INTERNAL_SERVER_ERROR
			)
		}
	}

	async update(id: number, dto: CreateGenreDto) {
		const existingGenre = await this.db.genre.findUnique({ where: { id } })

		if (!existingGenre) {
			throw new NotFoundException(`Жанр с идентификатором ${id} не найден.`)
		}
		try {
			const updatedGenre = await this.db.genre.update({
				where: { id },
				data: dto,
			})

			return updatedGenre
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				if (error.code === 'P2002') {
					throw new NotFoundException('Значение slug уже занят')
				}
			}
			// P2002: Ошибка уникального ограничения (Unique constraint violation).
			// P2003: Ошибка ограничения внешнего ключа (Foreign key constraint violation).
			// P2025: Нарушение ограничения уникальности (Unique constraint violation).
			// P2000: Общая ошибка базы данных.

			throw new InternalServerErrorException(
				'Произошла непонятная ошибка в базе данных',
				error
			)
		}
	}
}
