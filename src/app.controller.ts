import { Controller, Delete, Get, Post, Put } from "@nestjs/common"
import { AppService } from "./app.service"
import { RequestChargeDto } from "./dto/request.charge"
import StripeService from "./stripe.service"
import { CartService } from "./cart.service"
import { RequestAddItemToCartDto } from "./dto/request.additemtocart"
import { RequestGetCartDto } from "./dto/request.getcart"
import { RequestRemoveItemDto } from "./dto/request.removeitem"

@Controller('/api')
export class AppController {
	constructor(
		private appService: AppService,
		private stripeService: StripeService,
		private cartService: CartService
	) {}

	@Get('/user')
	async getUsers() {
		return await this.appService.createUser()
	}

	@Get('/cart')
	async getCart(data: RequestGetCartDto) {
		this.cartService.getCart(data.userId)
	}
	@Put('/cart')
	async addItem(additem: RequestAddItemToCartDto) {
		this.cartService.addToCart(
			additem.userId,
			additem.productId,
			additem.quantity
		)
	}
	@Delete('/cart')
	async removeItem(removeitem: RequestRemoveItemDto) {
		this.cartService.removeFromCart(removeitem.userId, removeitem.productId)
	}


	@Post('/charge')
	async createCharge(charge: RequestChargeDto) {
		await this.stripeService.charge(
			charge.amount,
			charge.paymentMethodId,
			charge.userId
		)
	}
}