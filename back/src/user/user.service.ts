import { Injectable } from '@nestjs/common'

@Injectable()
export class UserService {
	byId(id) {}

	updateProfile(id, dto) {}

	getFavoriteMovies(id) {}

	toggleFavorite(movieId, user) {}

	getCount() {}

	getAll(searchTerm) {}

	delete(id) {}
}
