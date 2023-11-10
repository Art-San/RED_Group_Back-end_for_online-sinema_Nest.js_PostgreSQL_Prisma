import {
	HttpException,
	HttpStatus,
	Injectable,
	InternalServerErrorException,
	NotFoundException,
} from '@nestjs/common'
import { Prisma } from '@prisma/client'

import { DbService } from 'src/db/db.service'
import { UpdateGenreDto } from './dto/update-genre.dto'

@Injectable()
export class GenreService {
	constructor(private db: DbService) {}

	async bySlug(slug: string) {
		const genre = await this.db.genre.findUnique({
			where: {
				slug,
			},
		})

		if (!genre) {
			throw new NotFoundException('Genre not found by slug: ' + slug)
		}

		return genre
	}

	//========================= Вариант от GPT =========================
	// async getAll(searchTerm?: string) {
	// 	const searchCondition = this.buildSearchCondition(searchTerm)

	// 	const genres = await this.db.genre.findMany({
	// 		where: searchCondition,
	// 		select: {
	// 			id: true,
	// 			name: true,
	// 			slug: true,
	// 			description: true,
	// 			icon: true,
	// 			createdAt: true,
	// 		},
	// 		orderBy: { createdAt: 'desc' },
	// 	})

	// 	return genres.map(({ id, name, slug, description, icon, createdAt }) => ({
	// 		id,
	// 		name,
	// 		slug,
	// 		description,
	// 		icon,
	// 		createdAt: createdAt.toISOString(),
	// 	}))
	// }

	// private buildSearchCondition(searchTerm?: string): any {
	// 	return {
	// 		OR: [
	// 			{ name: { contains: searchTerm ?? '', mode: 'insensitive' } },
	// 			{ slug: { contains: searchTerm ?? '', mode: 'insensitive' } },
	// 			{ description: { contains: searchTerm ?? '', mode: 'insensitive' } },
	// 		],
	// 	}
	// }

	async getAll(searchTerm?: string) {
		const genres = await this.db.genre.findMany({
			where: {
				OR: [
					{
						name: {
							contains: searchTerm ?? '', // оператор объединения nullish ??
							mode: 'insensitive',
						},
					},
					{
						slug: {
							contains: searchTerm || '',
							mode: 'insensitive',
						},
					},
					{
						description: {
							contains: searchTerm || '',
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
		return genres.map(({ id, name, slug, description, icon, createdAt }) => ({
			id,
			name,
			slug,
			description,
			icon,
			createdAt: createdAt.toISOString(),
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

	async update(id: number, dto: UpdateGenreDto) {
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
