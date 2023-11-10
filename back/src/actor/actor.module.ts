import { Module } from '@nestjs/common'
import { ActorService } from './actor.service'
import { ActorController } from './actor.controller'
import { DbModule } from 'src/db/db.module'

@Module({
	imports: [DbModule],
	controllers: [ActorController],
	providers: [ActorService],
})
export class ActorModule {}
