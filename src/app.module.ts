import { Module } from "@nestjs/common"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { SequelizeModule } from "@nestjs/sequelize"
import { User } from "./models/user.model"
import { Product } from "./models/product.model"
import { Cart } from "./models/cart.model"
import { CartProduct } from "./models/cartproduct.model"
import { CartService } from "./cart.service"

@Module({
	controllers: [AppController],
	providers: [AppService, CartService],
	imports: [
		SequelizeModule.forRoot({
			dialect: 'postgres',
			host: 'localhost',
			port: 5432,
			username: 'user',
			password: 'password',
			database: 'db',
			models: [User, Cart, CartProduct, Product],
			autoLoadModels: true,
		}),
		SequelizeModule.forFeature([User, Cart, CartProduct, Product]),
	],
})
export class AppModule {}