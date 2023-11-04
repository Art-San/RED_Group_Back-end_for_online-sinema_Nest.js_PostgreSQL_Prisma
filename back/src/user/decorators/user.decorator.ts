// import { createParamDecorator, ExecutionContext } from '@nestjs/common'
// // import { UserModel } from '../user.model'

// // Получаем текущего юзера (авторизованного)
// // https://docs.nestjs.com/custom-decorators
// // type TypeData = keyof UserModel
// export const User = createParamDecorator(
// 	(data: string, ctx: ExecutionContext) => {
// 		const request = ctx.switchToHttp().getRequest()
// 		const user = request.user
// 		// console.log('data', data) // _id

// 		return data ? user[data] : user
// 	}
// )

import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { User } from '@prisma/client' // Импорт модели данных пользователя из Prisma

type UserDataKey = keyof User // Определение типов данных пользователя в Prisma

export const UserDecorator = createParamDecorator(
	(data: UserDataKey, ctx: ExecutionContext) => {
		const request = ctx.switchToHttp().getRequest()
		const user = request.user

		return data ? user[data] : user
	}
)
