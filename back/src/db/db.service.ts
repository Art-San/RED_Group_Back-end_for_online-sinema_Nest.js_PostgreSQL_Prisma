import { PrismaClient } from '@prisma/client'
import { Injectable, OnModuleInit } from '@nestjs/common'

@Injectable()
export class DbService extends PrismaClient implements OnModuleInit {
	async onModuleInit() {
		// хук onModuleInit для подключения к БД
		await this.$connect()
	}
}

// import { PrismaClient } from '@prisma/client'
// import { Injectable, OnModuleInit } from '@nestjs/common'
// import { ConfigService } from '@nestjs/config'

// @Injectable()
// export class DbService extends PrismaClient implements OnModuleInit {
// 	constructor(private readonly configService: ConfigService) {
// 		super({
// 			log: configService.get('NODE_ENV') === 'development' ? ['query'] : [],
// 		})
// 	}

// 	async onModuleInit() {
// 		await this.$connect()
// 	}
// }
