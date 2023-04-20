import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import Stripe from 'stripe'
import { User } from './models/user.model'

@Injectable()
export default class StripeService {
	private stripe: Stripe

	constructor(@InjectModel(User) private userRepo: typeof User) {
		const secret_key = process.env.STRIPE_SK
		this.stripe = new Stripe(secret_key, {
			apiVersion: '2022-11-15',
		})
	}

	public async createCustomer() {
		return this.stripe.customers.create()
	}

	public async charge(
		amount: number,
		paymentMethodId: string,
		userId: number
	) {
		const user = await this.userRepo.findByPk(userId)


		return this.stripe.paymentIntents.create({
			amount,
			customer: user.stripeCustomerId,
			payment_method: paymentMethodId,
			currency: 'usd',
			confirm: true,
		})
	}
}
