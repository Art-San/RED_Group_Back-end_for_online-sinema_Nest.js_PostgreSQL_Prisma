import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { DbService } from './db.service'

@Module({
	imports: [],
	providers: [DbService, ConfigService],
	exports: [DbService], // Будем использовать по всему приложение по этому пишем "exports"
})
export class DbModule {}
