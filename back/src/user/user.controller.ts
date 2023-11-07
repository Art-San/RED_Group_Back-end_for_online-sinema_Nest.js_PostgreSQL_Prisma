import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Put,
	Query,
} from '@nestjs/common'

import { Auth } from 'src/auth/decorators/auth.decorator'

import { UserDecorator } from './decorators/user.decorator'

import { UpdateUserDto } from './dto/update-user.dto'

import { User } from '@prisma/client'
import { UserService } from './user.service'
import {
	ApiBearerAuth,
	ApiOkResponse,
	ApiOperation,
	ApiTags,
} from '@nestjs/swagger'
import { ProfileDto } from './dto/profile.dto'
import { ListUsersDto } from './dto/list-users.dto'
import { IsOptional } from 'class-validator'

@ApiBearerAuth() // Этот декоратор указывает, что эндпоинт требует аутентификации
@ApiTags('Users') // Можете добавить теги для группировки эндпоинтов в Swagger UI
@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get('profile')
	@ApiOkResponse({
		type: ProfileDto,
		description: 'Получили профиль',
	})
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
		return this.userService.updateProfile(id, dto)
	}

	@Get('profile/favorites') /*TODO:- нет реализации в сервисе*/
	@Auth()
	async getFavorites(@UserDecorator('id') id: string) {
		return this.userService.getFavoriteMovies(id)
	}

	@Put('profile/favorites') /*TODO:- нет реализации в сервисе*/
	@HttpCode(200)
	@Auth()
	async toggleFavorite(
		@Body('movieId') movieId: number,
		@UserDecorator() user: User
	) {
		return this.userService.toggleFavorite(movieId, user)
	}

	// ================= Только admin ==================
	// Количество все пользователей
	@Get('count')
	@ApiOperation({
		summary: 'Получить количество пользователей (только администратор)',
	})
	@Auth('admin')
	async getCountUsers() {
		return this.userService.getCount()
	}

	// Get all и ПОИСК по email и сортировка по дате
	@Get()
	@Auth('admin')
	@ApiOkResponse({
		type: ListUsersDto, // Здесь указывается тип данных, который возвращается вашим методом (например, User)
		description: 'Список пользователей', // Описание ответа
	})
	async getUsers(
		@Query('searchTerm')
		searchTerm?: string
	): Promise<ListUsersDto[]> {
		return this.userService.getAll(searchTerm)
	}

	// Get user :id
	@Get(':id')
	@ApiOkResponse({
		type: ProfileDto,
		description: 'Получили профиль',
	})
	@Auth('admin')
	async getUser(@Param('id') id: string) {
		return this.userService.byId(id)
	}

	// Обновление юзера
	@Put(':id')
	@ApiOkResponse({
		type: ProfileDto,
		description: 'Обновлен профиль Юзера',
	})
	@HttpCode(200)
	@Auth('admin')
	async updateUser(@Param('id') id: string, @Body() dto: UpdateUserDto) {
		return this.userService.updateProfile(id, dto)
	}

	// Удаление юзера
	@Delete(':id')
	@ApiOkResponse({
		type: ProfileDto,
		description: 'Пользователь успешно удален',
	})
	@Auth('admin')
	async deleteUser(@Param('id') id: string) {
		return this.userService.delete(id)
	}
}
