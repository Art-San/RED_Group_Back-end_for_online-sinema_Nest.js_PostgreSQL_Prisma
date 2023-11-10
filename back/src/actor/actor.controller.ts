import {
	Body,
	Controller,
	HttpCode,
	Param,
	ParseIntPipe,
	Post,
	Put,
} from '@nestjs/common'
import {
	ApiBearerAuth,
	ApiCreatedResponse,
	ApiResponse,
	ApiTags,
} from '@nestjs/swagger'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { ActorService } from './actor.service'
import { ActorDto } from './dto/actor.dto'

@ApiTags('Actors')
@Controller('actors')
export class ActorController {
	constructor(private readonly actorService: ActorService) {}

	/*Admin place*/
	@ApiBearerAuth()
	@Post()
	@ApiCreatedResponse({ description: 'Создался актер пустой, вернулся ID' })
	@HttpCode(200)
	@Auth('admin')
	async create() {
		return this.actorService.create()
	}

	@ApiBearerAuth()
	@Put(':id')
	@HttpCode(200)
	@ApiResponse({
		type: ActorDto,
	})
	@HttpCode(200)
	@Auth('admin')
	async update(@Param('id', ParseIntPipe) id: number, @Body() dto: ActorDto) {
		return this.actorService.update(id, dto)
	}
}
