import { IsNumber } from "class-validator"

export class RequestGetCartDto {
	@IsNumber()
	userId: number
}