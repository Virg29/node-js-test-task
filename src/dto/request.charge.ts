import { IsString, IsNotEmpty, IsNumber } from 'class-validator'

export class RequestChargeDto {
  @IsString()
  @IsNotEmpty()
  paymentMethodId: string
 
  @IsNumber()
  amount: number

  @IsNumber()
  userId: number
}
