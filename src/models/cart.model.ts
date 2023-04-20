import { BelongsToMany, Column, DataType, HasMany, HasOne, Model, Table } from 'sequelize-typescript'
import { User } from './user.model'
import { Product } from './product.model'
import { CartProduct } from './cartproduct.model'


@Table({ tableName: 'carts' })
export class Cart extends Model<Cart> {
	@Column
	userId: number

	@BelongsToMany(() => Product, () => CartProduct)
	products: Product[]

	@Column
	total: number
}