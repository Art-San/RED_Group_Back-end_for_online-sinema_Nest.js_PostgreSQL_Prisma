import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	const config = new DocumentBuilder().setTitle('online-sinema').build() // Название нашей документации, здесь много чего, но обойдемся тайтлом. Вызываем .build() что бы подключить config

	const document = SwaggerModule.createDocument(app, config)

	SwaggerModule.setup('api', app, document) // 1. Роут 2.Приложение 3. Документ который нужно хостит

	app.useGlobalPipes(new ValidationPipe()) // глобальный ValidationPipe не надо в контроллерах так писать @UsePipes(new ValidationPipe())
	await app.listen(3000)
}
bootstrap()
