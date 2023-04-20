import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const PORT = process.env.PORT || 3000
  const app = await NestFactory.create(AppModule)

  app.enableCors()

  const config = new DocumentBuilder().setTitle("Cart").setDescription("Rest api docs").setVersion("1.0.0").build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/docs',app,document)

  await app.listen(PORT)
}
bootstrap()
