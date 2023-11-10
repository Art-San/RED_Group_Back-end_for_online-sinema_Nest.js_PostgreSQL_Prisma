import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from './user/user.module'
import { AuthModule } from './auth/auth.module'
import { DbModule } from './db/db.module'
// import { MovieModule } from './movie/movie.module';
import { GenreModule } from './genre/genre.module'
import { FilesModule } from './files/files.module'
import { ActorModule } from './actor/actor.module'

@Module({
	imports: [
		DbModule,
		UserModule,
		AuthModule,
		GenreModule,
		FilesModule,
		ActorModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
