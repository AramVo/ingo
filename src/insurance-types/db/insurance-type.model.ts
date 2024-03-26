import { Column, Model, Table, DataType, HasMany } from 'sequelize-typescript';
import { InsuranceFields } from './insurance-fields.model';

@Table
export class InsuranceType extends Model {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ allowNull: false, unique: true })
  name: string;

  @Column({ allowNull: false, unique: true })
  path: string;

  @HasMany(() => InsuranceFields, { onDelete: 'CASCADE' })
  fields: InsuranceFields[];
}