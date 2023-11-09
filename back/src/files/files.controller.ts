import {
	Controller,
	HttpCode,
	Post,
	Query,
	UploadedFile,
	UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { FilesService } from './files.service'

@ApiBearerAuth() // Этот декоратор указывает, что эндпоинт требует аутентификации
@ApiTags('Users') // Можете добавить теги для группировки эндпоинтов в Swagger UI
@Controller('files')
export class FilesController {
	constructor(private readonly filesService: FilesService) {}

	@Post()
	@ApiCreatedResponse({ description: 'Файл загружен' })
	@HttpCode(200)
	@Auth('admin')
	@UseInterceptors(FileInterceptor('file')) // получаем файлы из запроса
	async uploadFile(
		@UploadedFile() file: Express.Multer.File,
		@Query('folder') folder?: string
	) {
		return this.filesService.saveFiles([file], folder)
	}
}
