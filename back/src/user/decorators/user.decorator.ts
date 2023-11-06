import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { User } from '@prisma/client' // Импорт модели данных пользователя из Prisma

type UserDataKey = keyof User // Определение типов данных пользователя в Prisma

// Получаем текущего юзера (авторизованного)
// https://docs.nestjs.com/custom-decorators
export const UserDecorator = createParamDecorator(
	(data: UserDataKey, ctx: ExecutionContext) => {
		const request = ctx.switchToHttp().getRequest()
		const user = request.user

		// console.log('UserDecorator', request) // Информация о входящем HTTP-запросе и связанном с ним HTTP-ответе
		// Длинная простыня, а главное в конце появляется USER благодаря auth.decorator.ts и JwtStrategy

		return data ? user[data] : user
	}
)

// Это мой вариант получаем ID из токена минуя auth декоратор
// import {
// 	createParamDecorator,
// 	ExecutionContext,
// 	UnauthorizedException,
// } from '@nestjs/common'
// import { User } from '@prisma/client'
// import { ConfigService } from '@nestjs/config'
// import { JwtService } from '@nestjs/jwt'

// const configService = new ConfigService()
// const jwtService = new JwtService()

// type UserDataKey = keyof User

// export const UserDecorator = createParamDecorator(
// 	async (data: UserDataKey, ctx: ExecutionContext) => {
// 		const request = ctx.switchToHttp().getRequest()

// 		const authorizationHeader = request.headers.authorization
// 		const token = authorizationHeader.split(' ')[1]

// 		if (!token) {
// 			throw new UnauthorizedException({ message: 'нет токена в куках' })
// 		}

// 		function parseJwt(token) {
// 			return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())
// 		}

// 		const decodedToken = parseJwt(authorizationHeader)

// 		// try {
// 		// 	const decodedToken = await jwtService.verifyAsync(token, {
// 		// 		secret: configService.get('JWT_SECRET'),
// 		// 	})
// 		// 	console.log('decodedToken', decodedToken)
// 		// 	return decodedToken.id
// 		// } catch (error) {
// 		// 	throw new UnauthorizedException({ message: 'Ошибка аутентификации' })
// 		// }

// 		console.log('decodedToken', decodedToken)
// 		return decodedToken.id
// 	}
// )
