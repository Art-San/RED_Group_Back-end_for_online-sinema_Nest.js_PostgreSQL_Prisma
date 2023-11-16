import {
	BadRequestException,
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from '@nestjs/common'
import { DbService } from 'src/db/db.service'
import { AuthDto } from './dto/auth.dto'
import { hash, verify } from 'argon2'
import { JwtService } from '@nestjs/jwt'
import { User } from '@prisma/client'
import { RefreshTokenDto } from './dto/refreshToken.dto'
import { ProfileService } from 'src/profile/profile.service'

@Injectable()
export class AuthService {
	constructor(
		private db: DbService,
		// private profileService: ProfileService,
		private readonly jwtService: JwtService
	) {}

	async login(dto: AuthDto) {
		const user = await this.validateUser(dto)

		const tokens = await this.issueTokenPair(String(user.id))

		return {
			user: this.returnUserFields(user),
			...tokens,
		}
	}

	async register(dto: AuthDto) {
		const oldUser = await this.db.user.findUnique({
			where: { email: dto.email },
		})
		if (oldUser) {
			throw new BadRequestException('Юзер с таким email есть уже в системе')
		}

		const newUser = await this.db.user.create({
			data: {
				email: dto.email,
				password: await hash(dto.password),
			},
		})

		// await this.profileService.create(newUser.id)

		const tokens = await this.issueTokenPair(String(newUser.id))
		return {
			user: this.returnUserFields(newUser),
			...tokens,
		}
	}

	async getNewTokens({ refreshToken }: RefreshTokenDto) {
		if (!refreshToken) {
			throw new UnauthorizedException('Пожалуйста войдите в систему')
		}

		const result = await this.jwtService.verifyAsync(refreshToken) // Верификация токена

		if (!result) {
			throw new UnauthorizedException(
				'Неверный токен или срок его действия истек'
			)
		}
		const user = await this.db.user.findUnique({
			where: { id: +result.id },
		})

		if (!user) {
			// Обработка случая, когда пользователь не найден

			throw new NotFoundException('Пользователь не найден')
		}

		const tokens = await this.issueTokenPair(String(user.id)) // Создаем токен

		return {
			user: this.returnUserFields(user),
			...tokens,
		}
	}

	async validateUser(dto: AuthDto): Promise<User> {
		const user = await this.db.user.findUnique({
			where: { email: dto.email },
		})

		if (!user) {
			throw new UnauthorizedException('Юзер с таким email нет в системе')
		}

		const isValidPassword = await verify(user.password, dto.password)
		if (!isValidPassword) {
			throw new UnauthorizedException('Не верный пароль')
		}

		return user
	}

	async issueTokenPair(userId: string) {
		const data = { id: userId }

		const refreshToken = await this.jwtService.signAsync(data, {
			expiresIn: '15d',
		})

		const accessToken = await this.jwtService.signAsync(data, {
			expiresIn: '1h',
		})

		return { refreshToken, accessToken }
	}

	returnUserFields(user: User) {
		return {
			id: user.id,
			email: user.email,
			isAdmin: user.isAdmin,
		}
	}
}
