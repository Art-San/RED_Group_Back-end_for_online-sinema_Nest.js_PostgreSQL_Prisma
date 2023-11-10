import {
	HttpException,
	HttpStatus,
	Injectable,
	InternalServerErrorException,
	NotFoundException,
} from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { DbService } from 'src/db/db.service'
import { UpdateActorDto } from './dto/update-actor.dto'

@Injectable()
export class ActorService {
	constructor(private db: DbService) {}

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
			throw new HttpException(
				'Ошибка создания жанра',
				HttpStatus.INTERNAL_SERVER_ERROR
			)
		}
	}

	async update(id: number, dto: UpdateActorDto) {
		const existingActor = await this.db.actor.findUnique({ where: { id } })

		if (!existingActor) {
			throw new NotFoundException(`Актер с идентификатором ${id} не найден.`)
		}
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
			// P2000: Общая ошибка базы данных.

			throw new InternalServerErrorException(
				'Произошла непонятная ошибка в базе данных',
				error
			)
		}
	}
}
