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

	async bySlug(slug: string) {
		try {
			const genre = await this.db.genre.findUnique({
				where: {
					slug,
				},
			})
			if (!genre) {
				throw new NotFoundException('По слагу Genre не найден')
			}
			return genre
		} catch (error) {
			throw new InternalServerErrorException(error.message)
		}
	}

	async getAll(searchTerm?: string) {
		const genres = await this.db.genre.findMany({
			where: {
				OR: [
					{
						name: {
							contains: searchTerm ? searchTerm : '',
							mode: 'insensitive',
						},
					},
					{
						slug: {
							contains: searchTerm ? searchTerm : '',
							mode: 'insensitive',
						},
					},
					{
						description: {
							contains: searchTerm ? searchTerm : '',
							mode: 'insensitive',
						},
					},
				],
			},
			select: {
				id: true,
				name: true,
				slug: true,
				description: true,
				icon: true,
				createdAt: true,
			},
			orderBy: { createdAt: 'desc' },
		})

		return genres.map((genre) => ({
			id: genre.id,
			name: genre.name,
			slug: genre.slug,
			description: genre.description,
			icon: genre.icon,
			createdAt: genre.createdAt.toISOString(),
		}))
	}

	async getCollections() {
		throw new NotFoundException('метод еще не реализован')
	}

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

	async delete(id: number) {
		try {
			const genre = await this.db.genre.delete({
				where: { id: id },
			})
			if (!genre) {
				throw new NotFoundException('Жанр не найден')
			}
			return genre
		} catch (error) {
			// console.log(error)

			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				if (error.code === 'P2025') {
					throw new NotFoundException('не найден жанр с таким id')
				}
			}
			throw new InternalServerErrorException(
				'Произошла ошибка при удалении жанра',
				error
			)
		}
	}
}
