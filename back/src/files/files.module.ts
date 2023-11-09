import { Module } from '@nestjs/common'
import { FilesController } from './files.controller'

import { ServeStaticModule } from '@nestjs/serve-static'
import { path } from 'app-root-path'
import { FilesService } from './files.service'

@Module({
	imports: [
		ServeStaticModule.forRoot({
			rootPath: `${path}/uploads`, // путь куда сохраняем файлы
			serveRoot: '/uploads',
		}),
	],
	controllers: [FilesController],
	providers: [FilesService],
})
export class FilesModule {}
