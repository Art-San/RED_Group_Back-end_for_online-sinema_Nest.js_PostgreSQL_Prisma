import { Injectable, NotFoundException } from '@nestjs/common'
import { DbService } from 'src/db/db.service'
import { UpdateUserDto } from './dto/update-user.dto'
import { hash, verify } from 'argon2'

@Injectable()
export class UserService {
	constructor(private db: DbService) {}

	async byId(id: string) {
		const user = await this.db.user.findUnique({
			where: { id: +id },
		})
		if (!user) {
			throw new NotFoundException('Юзер не найден')
		}
		return user
	}

	async updateProfile(id: string, dto: UpdateUserDto) {
		const user = await this.byId(id)

		const isSameUser = await this.db.user.findUnique({
			where: { email: dto.email },
		})

		if (isSameUser && String(id) !== String(isSameUser.id)) {
			throw new NotFoundException('Email занят')
		}

		if (dto.password) {
			user.password = await hash(dto.password)
		}

		user.email = dto.email

		if (dto.isAdmin || dto.isAdmin === false) {
			user.isAdmin = dto.isAdmin
		}

		// Сохраните изменения в базе данных
		const updatedUser = await this.db.user.update({
			where: { id: user.id },
			data: {
				email: user.email,
				password: user.password,
				isAdmin: user.isAdmin,
			},
		})

		return updatedUser
	}

	getFavoriteMovies(id) {}

	toggleFavorite(movieId, user) {}

	async getCount() {
		return this.db.user.count()
	}

	async getAll(searchTerm?: string) {
		const users = await this.db.user.findMany({
			where: {
				OR: [
					{
						email: {
							contains: searchTerm ? searchTerm : '',
							mode: 'insensitive',
						},
					},
				],
			},
			select: {
				id: true,
				email: true,
				isAdmin: true,
				createdAt: true,
			},
			orderBy: {
				createdAt: 'desc',
			},
		})

		return users
	}

	async delete(id: string) {
		try {
			const user = await this.db.user.delete({
				where: { id: +id },
			})
			if (!user) {
				throw new Error('Пользователь не найден')
			}
			return user
		} catch (error) {
			throw new Error('Произошла ошибка при удалении пользователя')
		}
	}
}
