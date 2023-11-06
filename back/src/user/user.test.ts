// import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

// @ApiBearerAuth() // Этот декоратор указывает, что эндпоинт требует аутентификации
// @ApiTags('Users') // Можете добавить теги для группировки эндпоинтов в Swagger UI
// @Controller('users')
// export class UsersController {
//   constructor(private readonly userService: UserService) {}

//   @Get('count')
//   @ApiOperation({ summary: 'Get the count of users (admin only)' })
//   @Auth('admin') // Декоратор для проверки аутентификации администратора
//   async getCountUsers() {
//     return this.userService.getCount();
//   }
// }
