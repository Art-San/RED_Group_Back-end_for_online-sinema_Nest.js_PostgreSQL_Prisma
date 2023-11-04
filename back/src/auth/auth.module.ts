import { Module } from '@nestjs/common'
import { DbService } from 'src/db/db.service'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

@Module({
	imports: [],
	controllers: [AuthController],
	providers: [AuthService, DbService],
})
export class AuthModule {}
