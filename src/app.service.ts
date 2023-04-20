import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/sequelize"
import { User } from "./models/user.model"
import StripeService from "./stripe.service"

@Injectable()
export class AppService {
	constructor(
		@InjectModel(User) private userRepo: typeof User,
		private stripeService: StripeService
	) {}
	async createUser() {
		const customer = await this.stripeService.createCustomer()
		const user = await this.userRepo.create({stripeCustomerId:customer.id})
		await user.save()
		return user
	}
}