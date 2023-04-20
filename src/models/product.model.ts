import { Column, DataType, Model, Table } from 'sequelize-typescript'

@Table({ tableName: 'products' })
export class Product extends Model<Product> {
	@Column({
		type: DataType.INTEGER,
		unique: true,
		autoIncrement: true,
		primaryKey: true,
	})
	id: number

	@Column({
		type: DataType.INTEGER,
	})
	price: number
}
