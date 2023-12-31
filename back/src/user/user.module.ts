import { Module } from '@nestjs/common'
import { DbModule } from 'src/db/db.module'
import { UserController } from './user.controller'
import { UserService } from './user.service'

@Module({
	imports: [DbModule],
	providers: [UserService],
	controllers: [UserController],
})
export class UserModule {}
