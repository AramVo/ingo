import { Column, Model, Table, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';

import { InsuranceType } from './insurance-type.model';

enum ValueTypes {
  NUMBER = 'NUMBER',
  STRING = 'STRING',
  DATE = 'DATE',
}

@Table
export class InsuranceFields extends Model {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ allowNull: false })
  name: string;

  @Column({
    allowNull: false,
    defaultValue: ValueTypes.STRING,
    type: DataType.ENUM(...Object.values(ValueTypes)),
  })
  valueType: string;

  @ForeignKey(() => InsuranceType)
  @Column({ allowNull: false })
  typeId: number;

  @BelongsTo(() => InsuranceType)
  insuranceType: InsuranceType;
}