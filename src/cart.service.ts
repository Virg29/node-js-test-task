import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Cart } from './models/cart.model'
import { Product } from './models/product.model'
import { CartProduct } from './models/cartproduct.model'

@Injectable()
export class CartService {
	lifeTime : number
	cartMap : Map<Cart, number>
	constructor(
		@InjectModel(Cart) private cartModel: typeof Cart,
		@InjectModel(Product) private productModel: typeof Product,
		@InjectModel(CartProduct) private cartProductModel: typeof CartProduct
	) {
		this.lifeTime = 60 * 5
		this.cartMap = new Map()
		this.runCartCleaner()
	}

	private setMaxLifetimeTo(cart: Cart){
		if(this.cartMap.get(cart) == null || this.cartMap.get(cart) == undefined){
			this.cartMap.set(cart,this.lifeTime)
		}
	}

	private async runCartCleaner(){
		setTimeout(async () => {
			await this.checkCartsLifetime()
			return this.runCartCleaner()
		}, 1000)
	}

	private async checkCartsLifetime(){
		const cartsToClear = []
		for (let [key, value] of this.cartMap) {
			if(value<=0){
				cartsToClear.push(key)
			}
			this.cartMap.set(key,value-1)
		}
		for(let cart of cartsToClear){
			this.cartMap.delete(cart)
		}
		this.clearCarts(cartsToClear)
	} 

	private async clearCarts(carts: Cart[]){
		for(let cart of carts){

			const cartProducts = await this.cartProductModel.findAll({
				where: { cartId: cart.id },
			})
			for (let cartProduct of cartProducts){
				cartProduct.destroy()
			}
			cart.destroy()
		}
	}

	async addToCart(userId: number, productId: number, quantity: number) {
		const cart = await this.getOrCreateCart(userId)

		let cartProduct = await this.cartProductModel.findOne({
			where: { cartId: cart.id, productId },
		})

		if (!cartProduct) {
			cartProduct = await this.cartProductModel.create({
				cartId: cart.id,
				productId,
				quantity,
			})
		} else {
			cartProduct.quantity += quantity
			await cartProduct.save()
		}

		await this.updateCartTotal(cart)

		return cart
	}

	private async getOrCreateCart(userId: number) {
		let cart = await this.cartModel.findOne({ where: { userId } })

		if (!cart) {
			cart = await this.cartModel.create({ userId })
		}

		this.setMaxLifetimeTo(cart)

		return cart
	}

	
	private async updateCartTotal(cart: Cart) {
		this.setMaxLifetimeTo(cart)

		const cartProducts = await this.cartProductModel.findAll({
			where: { cartId: cart.id },
			include: [Product],
		})

		let total = 0
		for (const cartProduct of cartProducts) {
			total += cartProduct.quantity * cartProduct.product.price
		}

		cart.total = total
		await cart.save()
	}

	async removeFromCart(userId: number, productId: number) {
		const cart = await this.getOrCreateCart(userId)

		const cartProduct = await this.cartProductModel.findOne({
			where: { cartId: cart.id, productId },
		})

		if (cartProduct) {
			await cartProduct.destroy()
			await this.updateCartTotal(cart)
		}

		return cart
	}

	async getCart(userId: number) {
		const cart = await this.getOrCreateCart(userId)

		const cartProducts = await this.cartProductModel.findAll({
			where: { cartId: cart.id },
			include: [Product],
		})

		const virtualCart: {products?: CartProduct[]} = {}

		Object.assign(virtualCart,cart)
		virtualCart.products = cartProducts

		return virtualCart
	}
}
