import {
	ConflictException,
	Injectable,
	InternalServerErrorException,
	Logger,
	NotFoundException,
} from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { DbService } from 'src/db/db.service'
import { UpdateActorDto } from './dto/update-actor.dto'

@Injectable()
export class ActorService {
	private readonly logger = new Logger(ActorService.name)
	constructor(private db: DbService) {}

	async bySlug(slug: string) {
		const actor = await this.db.actor.findUnique({
			where: {
				slug,
			},
		})

		if (!actor) {
			throw new NotFoundException('По слагу Actor не найден')
		}

		return actor
	}

	async getAll(searchTerm?: string) {
		const actors = await this.db.actor.findMany({
			where: {
				OR: [
					{
						name: {
							contains: searchTerm || '',
							mode: 'insensitive',
						},
					},
					{
						slug: {
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
				photo: true,
				createdAt: true,
			},
			orderBy: { createdAt: 'desc' },
		})

		// const actorsWithMoviesCount = await Promise.all(
		// 	actors.map(async (actor) => {
		// 		const movies = await this.db.movie.findMany({
		// 			where: {
		// 				actors: {
		// 					some: {
		// 						id: actor.id,
		// 					},
		// 				},
		// 			},
		// 		});

		// 		return {
		// 			...actor,
		// 			countMovies: movies.length,
		// 		};
		// 	})
		// );

		return actors
		// return actorsWithMoviesCount;
	}

	/*Admin place*/
	async byId(id: number) {
		try {
			const actor = await this.db.actor.findFirst({
				where: {
					id: id,
				},
			})

			if (!actor) {
				throw new NotFoundException('Актер не найден!!!')
			}

			return actor
		} catch (error) {
			throw new InternalServerErrorException(
				'Произошла непредвиденная ошибка',
				error.message
			)
		}
	}

	async create() {
		try {
			const defaultValue = {
				name: '',
				slug: '',
				photo: '',
			}

			const actor = await this.db.actor.create({
				data: defaultValue,
			})

			return actor.id
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				if (error.code === 'P2002') {
					throw new NotFoundException('Значение slug должен быть уникальным')
				}
			}

			throw new InternalServerErrorException(
				'Произошла непонятная ошибка в базе данных, при создании актера',
				error
			)
		}
	}

	async update(id: number, dto: UpdateActorDto) {
		await this.byId(id)
		// console.log('existingActor', existingActor)
		// const existingActor = await this.db.actor.findFirst({ where: { id } })
		// if (!existingActor) {
		// 	throw new NotFoundException(`Актер с идентификатором ${id} не найден.`)
		// }
		try {
			const updatedActor = await this.db.actor.update({
				where: { id },
				data: dto,
			})

			return updatedActor
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

			throw new InternalServerErrorException(
				'Произошла непонятная ошибка в базе данных, при обновление актера ',
				error
			)
		}
	}

	async delete(id: number) {
		try {
			const deletedActor = await this.db.actor.delete({
				where: { id: id },
			})
			if (!deletedActor) {
				throw new ConflictException(`Актер с идентификатором ${id} не найден.`)
			}
			return deletedActor
		} catch (error) {
			// console.log('error', error.meta.cause)
			this.logger.error(
				`Произошла ошибка во время удаления актера с идентификатором ${id}`,
				error.stack,
				'ActorService.delete'
			)
			// if (error instanceof Prisma.PrismaClientKnownRequestError) {
			// 	if (error.code === 'P2025') {
			// 		throw new ConflictException(
			// 			`Актер с идентификатором ${id} не найден.`
			// 		)
			// 	}
			// }
			throw new ConflictException(
				`Ошибка при удалении актера: ${error.meta.cause}`
				// `Ошибка при удалении актера: ${error.message}`
			)
		}
	}
}
