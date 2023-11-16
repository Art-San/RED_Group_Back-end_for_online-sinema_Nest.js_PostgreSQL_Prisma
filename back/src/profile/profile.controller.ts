import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseIntPipe,
	Post,
	Put,
	Query,
} from '@nestjs/common'
import { ProfileService } from './profile.service'

import { UserDecorator } from 'src/user/decorators/user.decorator'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { UpdateProfileDto } from './dto/update.profile.dto'
import { ProfileDto } from './dto/profile.dto'

@Controller('test')
export class ProfileController {
	constructor(private readonly profileService: ProfileService) {}

	@Get()
	async getAll(
		@Query('searchTerm') searchTerm?: string
	): Promise<ProfileDto[]> {
		return this.profileService.getAll(searchTerm)
	}

	@Post()
	@Auth()
	async create(@UserDecorator('id', ParseIntPipe) id: number) {
		return this.profileService.create(id)
	}

	@Put(':id')
	@Auth()
	async update(
		@Param('id', ParseIntPipe) idProfile: number,
		@UserDecorator('id', ParseIntPipe) idUser: number,
		@Body() dto: UpdateProfileDto
	) {
		return this.profileService.update(idProfile, idUser, dto)
	}

	// @Delete(':id')
	// async deleteUser(@Param('id', ParseIntPipe) id: number) {
	// 	return this.profileService.delete(id)
	// }
}
