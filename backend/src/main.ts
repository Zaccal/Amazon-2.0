import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

const logPreview = (port: string | number) => {
	console.log(`
🚀 Hooray! Server successfully started! 🚀

🌟 You're all set! Access your server at:
   http://localhost:${port}
	`)
}

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		cors: false
	})
	app.enableCors()
	app.setGlobalPrefix('api')
	await app.listen(5000)
	logPreview(5000)
}
bootstrap()
