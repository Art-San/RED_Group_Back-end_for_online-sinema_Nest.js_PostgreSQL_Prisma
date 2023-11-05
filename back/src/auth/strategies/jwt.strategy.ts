import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'

import { ExtractJwt, Strategy } from 'passport-jwt'
import { User } from '@prisma/client'
import { DbService } from 'src/db/db.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		private readonly configService: ConfigService,
		private readonly db: DbService
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: true,
			secretOrKey: configService.get('JWT_SECRET'),
		})
	}

	async validate({ id }: Pick<User, 'id'>) {
		const user = await this.db.user.findUnique({
			where: { id: +id },
		})

		if (!user) {
			throw new UnauthorizedException('Пользователь не найден')
		}
		return user
	}
}

//============= Этот код от туда где mongoDB
// import { Injectable } from '@nestjs/common'
// import { ConfigService } from '@nestjs/config'
// import { PassportStrategy } from '@nestjs/passport'
// import { ModelType } from '@typegoose/typegoose/lib/types'
// import { InjectModel } from 'nestjs-typegoose'
// import { ExtractJwt, Strategy } from 'passport-jwt'
// import { UserService } from 'src/user/user.service'
// import { User } from '@prisma/client'

// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {
// 	constructor(
// 		private readonly configService: ConfigService,
// 		@InjectModel(UserModel) private readonly UserModel: ModelType<UserModel>
// 	) {
// 		super({
// 			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
// 			ignoreExpiration: true,
// 			secretOrKey: configService.get('JWT_SECRET'),
// 		})
// 	}

// async validate({ _id }: Pick<UserModel, '_id'>) {
// 	// return this.UserModel.findById(_id).exec()
// 	const user = await this.UserModel.findById(_id)
// 	return user
// }
// }
