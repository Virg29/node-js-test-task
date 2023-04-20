import {
	Model,
	Column,
	Table,
	ForeignKey,
	DataType,
} from 'sequelize-typescript'
import { Cart } from './cart.model'
import { Product } from './product.model'

@Table
export class CartProduct extends Model<CartProduct> {
	@ForeignKey(() => Cart)
	@Column({ type: DataType.INTEGER })
	cartId: number

	@ForeignKey(() => Product)
	@Column({ type: DataType.INTEGER })
	productId: number

	@Column({ type: DataType.INTEGER })
	quantity: number
}
