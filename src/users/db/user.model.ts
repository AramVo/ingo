import { Column, Model, Table, DataType, Index } from 'sequelize-typescript';

@Table
export class User extends Model {
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

  @Index({ unique: true })
  @Column({ allowNull: false })
  email: string;

  @Column({ allowNull: false })
  password: string
}