import {
	Body,
	Controller,
	Delete,
	HttpCode,
	Param,
	ParseIntPipe,
	Post,
	Put,
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

	/*Admin place*/
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
	@HttpCode(200)
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
