import { Column, DataType, HasOne, Model, Table } from "sequelize-typescript"
import { Cart } from "./cart.model"


@Table({ tableName: 'users' })
export class User extends Model<User> {
	@Column({
		type: DataType.INTEGER,
		unique: true,
		autoIncrement: true,
		primaryKey: true,
	})
	id: number

	@Column({type: DataType.STRING})
	public stripeCustomerId: string

}