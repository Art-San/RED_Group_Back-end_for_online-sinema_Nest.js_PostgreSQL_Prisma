// Для админа
import {
	CanActivate,
	ExecutionContext,
	ForbiddenException,
	Injectable,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { User } from '@prisma/client'

@Injectable() // implements-реализует используем CanActivate так как это самапис
export class OnlyAdminGuard implements CanActivate {
	// OnlyAdminGuard только для админа
	constructor(private reflector: Reflector) {}
	canActivate(context: ExecutionContext): boolean {
		const request = context.switchToHttp().getRequest<{ user: User }>()
		const user = request.user

		if (!user.isAdmin) throw new ForbiddenException('У вас нет прав !')

		return user.isAdmin
	}
}
