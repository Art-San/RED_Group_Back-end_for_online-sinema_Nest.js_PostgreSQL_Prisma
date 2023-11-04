import { PrismaClient } from '@prisma/client'
import { Injectable, OnModuleInit } from '@nestjs/common'

@Injectable()
export class DbService extends PrismaClient implements OnModuleInit {
	async onModuleInit() {
		// хук onModuleInit для подключения к БД
		await this.$connect()
	}
}
