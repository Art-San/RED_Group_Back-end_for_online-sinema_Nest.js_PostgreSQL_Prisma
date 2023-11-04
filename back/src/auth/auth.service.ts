import { BadRequestException, Injectable } from '@nestjs/common'
import { DbService } from 'src/db/db.service'
import { AuthDto } from './dto/auth.dto'
import { hash, verify } from 'argon2'

@Injectable()
export class AuthService {
	constructor(private db: DbService) {}

	async register(dto: AuthDto) {
		const oldUser = await this.db.user.findUnique({
			where: { email: dto.email },
		})
		if (oldUser) {
			throw new BadRequestException('Юзер с таким email есть уже в системе')
		}

		const newUser = this.db.user.create({
			data: {
				email: dto.email,
				password: await hash(dto.password),
			},
		})

		// const user = await newUser.save()

		// const tokens = await this.issueTokenPair(String(user._id))
		// return {
		//   user: this.returnUserFields(user),
		//   ...tokens,
		// }
		return newUser
	}
}
