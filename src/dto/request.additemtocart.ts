import { IsNumber } from "class-validator"

export class RequestAddItemToCartDto {
	@IsNumber()
	userId: number
	@IsNumber()
	productId: number
	@IsNumber()
	quantity: number
}