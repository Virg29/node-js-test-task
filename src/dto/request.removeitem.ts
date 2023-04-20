import { IsNumber } from "class-validator"

export class RequestRemoveItemDto {
	@IsNumber()
	userId: number

	@IsNumber()
	productId: number
}