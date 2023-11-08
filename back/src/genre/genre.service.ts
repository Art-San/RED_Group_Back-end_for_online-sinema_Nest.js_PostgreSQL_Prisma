import {
	HttpException,
	HttpStatus,
	Injectable,
	NotFoundException,
} from '@nestjs/common'
import { DbService } from 'src/db/db.service'
import { CreateGenreDto } from './dto/create-genre.dto'

@Injectable()
export class GenreService {
	constructor(private db: DbService) {}

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
			throw new NotFoundException(`Genre with id ${id} not found`)
		}

		const updatedGenre = await this.db.genre.update({
			where: { id },
			data: dto,
		})

		return updatedGenre
	}
}
