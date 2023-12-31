import { Injectable } from '@nestjs/common'
import { path } from 'app-root-path'
import { ensureDir, writeFile } from 'fs-extra'
import { FileResponse } from './files.interface'

@Injectable()
export class FilesService {
	async saveFiles(
		files: Express.Multer.File[],
		folder: string = 'default'
	): Promise<FileResponse[]> {
		try {
			const uploadFolder = `${path}/uploads/${folder}`
			await ensureDir(uploadFolder) // ensureDir проверяет есть ли папка если нет то создает

			const res: FileResponse[] = await Promise.all(
				files.map(async (file) => {
					await writeFile(`${uploadFolder}/${file.originalname}`, file.buffer) // Наш файл записан

					return {
						url: `/uploads/${folder}/${file.originalname}`, // это то что потом получаем на фронтенде
						name: file.originalname,
					}
				})
			)

			return res
		} catch (error) {
			// Обработка ошибок, например, логирование или возврат ошибки
			console.error('Ошибка при сохранении файлов:', error)
			throw new Error('Ошибка при сохранении файлов')
		}
	}
}

// import { Injectable } from '@nestjs/common'
// import { path } from 'app-root-path'
// import { ensureDir, writeFile } from 'fs-extra'
// import { FileResponse } from './files.interface'

// @Injectable()
// export class FilesService {
// 	async saveFiles(
// 		files: Express.Multer.File[],
// 		folder: string = 'default'
// 	): Promise<FileResponse[]> {
// 		const uploadFolder = `${path}/uploads/${folder}`
// 		await ensureDir(uploadFolder) // ensureDir проверяет есть ли папка если нет то создает

// 		const res: FileResponse[] = await Promise.all(
// 			files.map(async (file) => {
// 				await writeFile(`${uploadFolder}/${file.originalname}`, file.buffer) // Наш файл записан

// 				return {
// 					url: `/uploads/${folder}/${file.originalname}`, // это то что потом получаем на фронтенде
// 					name: file.originalname,
// 				}
// 			})
// 		)

// 		return res
// 	}
// }
