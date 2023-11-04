import { Injectable, NotFoundException } from '@nestjs/common'
import { DbService } from 'src/db/db.service'

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

	updateProfile(id, dto) {}

	getFavoriteMovies(id) {}

	toggleFavorite(movieId, user) {}

	getCount() {}

	getAll(searchTerm) {}

	delete(id) {}
}
