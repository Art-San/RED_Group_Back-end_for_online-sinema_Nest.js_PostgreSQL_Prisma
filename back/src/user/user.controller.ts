import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Put,
	Query,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common'

import { Auth } from 'src/auth/decorators/auth.decorator'

import { UserDecorator } from './decorators/user.decorator'

import { UpdateUserDto } from './dto/update-user.dto'

import { User } from '@prisma/client'
import { UserService } from './user.service'
import { ApiOkResponse } from '@nestjs/swagger'
import { ProfileDto } from './dto/profile.dto'

@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get('profile')
	@ApiOkResponse({ description: 'Получили профиль' })
	@Auth() // Самописный декоратор user || admin Должен быть авторизован
	async getProfile(@UserDecorator('id') id: string) {
		return this.userService.byId(id)
	}

	@Put('profile')
	@ApiOkResponse({
		type: ProfileDto,
	})
	@HttpCode(200)
	@Auth()
	async updateProfile(
		@UserDecorator('id') id: string,
		@Body() dto: UpdateUserDto
	) {
		// сам юзер обновляет данные
		return this.userService.updateProfile(id, dto)
	}

	@Get('profile/favorites')
	// @Auth()
	async getFavorites(@UserDecorator('id') id: string) {
		return this.userService.getFavoriteMovies(id)
	}

	@Put('profile/favorites')
	@HttpCode(200)
	// @Auth()
	async toggleFavorite(
		@Body('movieId') movieId: number,
		@UserDecorator() user: User
	) {
		return this.userService.toggleFavorite(movieId, user)
	}

	@Get('count')
	// @Auth('admin')
	async getCountUsers() {
		return this.userService.getCount()
	}

	// ПОЛУЧЕНИЕ ВСЕХ и ПОИСК по email и сортировка по дате АДМИНОМ
	@Get() // ?searchTerm = 'rety' квери параметр
	// @Auth('admin')
	async getUsers(@Query('searchTerm') searchTerm?: string) {
		return this.userService.getAll(searchTerm)
	}

	// ПОЛУЧЕНИЕ профиля конкретного юзера АДМИНОМ
	@Get(':id')
	// @Auth('admin')
	async getUser(@Param('id') id: string) {
		return this.userService.byId(id)
	}
	// ОБНОВЛЕНИЕ записи юзера АДМИНОМ
	@UsePipes(new ValidationPipe())
	@Put(':id') // :id query param вытаскивается через декоратор @Param
	@HttpCode(200)
	// @Auth('admin') // Должен быть имено admin
	async updateUser(
		// Админ меняет данные
		@Param('id') id: string,
		@Body() dto: UpdateUserDto
	) {
		return this.userService.updateProfile(id, dto)
	}
	// УДАЛЕНИЕ записи юзера АДМИНОМ
	@Delete(':id') // :id query param вытаскивается через декоратор @Param
	@HttpCode(200)
	// @Auth('admin')
	async deleteUser(
		// Админ меняет данные
		@Param('id') id: string
	) {
		return this.userService.delete(id)
	}
}
