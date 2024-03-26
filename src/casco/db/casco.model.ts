import { Column, Model, Table, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from 'src/users/db/user.model';

@Table
export class Casco extends Model {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ allowNull: false })
  firstName: string;

  @Column({ allowNull: false })
  lastName: string;

  @Column({ allowNull: false })
  email: string;

  @Column({ allowNull: false })
  car: string;

  @Column({ allowNull: false })
  cascoSpeceficField: string;

  @ForeignKey(() => User)
  @Column({ allowNull: false })
  userId: number;

  @BelongsTo(() => User)
  user: User;
}