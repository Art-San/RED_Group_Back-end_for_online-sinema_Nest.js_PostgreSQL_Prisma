import { Module } from '@nestjs/common'
import { JwtModule, JwtService } from '@nestjs/jwt'
import { DbService } from 'src/db/db.service'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { getJWTConfig } from 'src/config/jwt.config'
import { JwtStrategy } from './strategies/jwt.strategy'
import { ProfileModule } from 'src/profile/profile.module'
import { ProfileService } from 'src/profile/profile.service'

@Module({
	imports: [
		ProfileModule,
		ConfigModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getJWTConfig,
		}),
	],
	controllers: [AuthController],
	providers: [AuthService, DbService, JwtStrategy, ProfileService],
})
export class AuthModule {}
