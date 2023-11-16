import {
	BadRequestException,
	HttpException,
	HttpStatus,
	Injectable,
	InternalServerErrorException,
	NotFoundException,
} from '@nestjs/common'
import { DbService } from 'src/db/db.service'
import { UpdateProfileDto } from './dto/update.profile.dto'
import { Prisma } from '@prisma/client'

@Injectable()
export class ProfileService {
	constructor(private db: DbService) {}

	async getAll(searchTerm?: string) {
		const profiles = await this.db.profile.findMany({
			where: {
				OR: [
					{
						car: {
							contains: searchTerm ?? '', // оператор объединения nullish ??
							mode: 'insensitive',
						},
					},
				],
			},
			select: {
				id: true,
				car: true,
				familyStatus: true,
				createdAt: true,
			},
			orderBy: { createdAt: 'desc' },
		})
		return profiles.map(({ id, car, familyStatus, createdAt }) => ({
			id,
			car,
			familyStatus,
			createdAt: createdAt.toISOString(),
		}))
	}

	async create(userId: number) {
		try {
			// const profile = await this.db.profile.findFirst({
			// 	where: {
			// 		userId: userId,
			// 	},
			// })
			// if (profile) {
			// 	throw new BadRequestException('Нельзя создать профилей больше одного')
			// }
			const profileNew = this.db.profile.create({
				data: {
					userId: userId,
					familyStatus: 'no',
					car: 'Isuzu',
				},
			})

			return profileNew
		} catch (error) {
			throw new HttpException(
				'Ошибка создания профиля',
				HttpStatus.INTERNAL_SERVER_ERROR
			)
		}
	}

	async update(iidProfile: number, idUser: number, dto: UpdateProfileDto) {
		const existingProfile = await this.db.profile.findUnique({
			where: { id: iidProfile },
		})

		if (!existingProfile) {
			throw new NotFoundException(
				`Profile с идентификатором ${iidProfile} не найден.`
			)
		}
		if (existingProfile.userId !== idUser) {
			throw new NotFoundException('Допустимо редактировать только свои профиля')
		}
		try {
			const updatedProfile = await this.db.profile.update({
				where: { id: iidProfile },
				data: dto,
			})
			return updatedProfile
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				if (error.code === 'P2002') {
					throw new NotFoundException('Значение slug уже занят')
				}
			}
			throw new InternalServerErrorException(
				'Произошла непонятная ошибка в базе данных',
				error
			)
		}
	}
}
