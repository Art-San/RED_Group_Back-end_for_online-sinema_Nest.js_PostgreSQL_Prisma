import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	ParseIntPipe,
	Post,
	Put,
	Query,
} from '@nestjs/common'
import {
	ApiBearerAuth,
	ApiCreatedResponse,
	ApiOkResponse,
	ApiResponse,
	ApiTags,
} from '@nestjs/swagger'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { ActorService } from './actor.service'
import { ActorDto } from './dto/actor.dto'
import { CreateActorDto } from './dto/create-actor.dto'
import { UpdateActorDto } from './dto/update-actor.dto'

@ApiTags('Actors')
@Controller('actors')
export class ActorController {
	constructor(private readonly actorService: ActorService) {}

	@Get('by-slug/:slug')
	@ApiResponse({
		type: ActorDto,
	})
	async bySlug(@Param('slug') slug: string) {
		return this.actorService.bySlug(slug)
	}

	/*TODO: Не работает поиск @Query FIXME: */
	@Get()
	@ApiResponse({
		type: ActorDto,
	})
	async getAll(@Query('searchTerm') searchTerm?: string) {
		return this.actorService.getAll(searchTerm)
	}

	/*Admin place*/
	@ApiBearerAuth()
	@Get(':id')
	@ApiResponse({
		type: ActorDto,
	})
	@Auth('admin')
	async get(@Param('id', ParseIntPipe) id: number) {
		return this.actorService.byId(id)
	}

	@ApiBearerAuth()
	@Post()
	@ApiCreatedResponse({
		type: CreateActorDto,
		description: 'Создался актер пустой, вернулся ID',
	})
	@Auth('admin')
	async create() {
		return this.actorService.create()
	}

	@ApiBearerAuth()
	@Put(':id')
	@HttpCode(200)
	@ApiResponse({
		type: UpdateActorDto,
	})
	@Auth('admin')
	async update(@Param('id', ParseIntPipe) id: number, @Body() dto: ActorDto) {
		return this.actorService.update(id, dto)
	}

	@ApiBearerAuth()
	@Delete(':id')
	@ApiOkResponse({
		type: ActorDto,
		description: 'Актер успешно удален',
	})
	@Auth('admin')
	async deleteUser(@Param('id', ParseIntPipe) id: number) {
		return this.actorService.delete(id)
	}
}
