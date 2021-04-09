import { BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { User } from '../user.model';

@Table
export class Task extends Model {
  @Column
  description: string;

  @Column
  date: Date;

  @Column 
  @ForeignKey(() => User)
  userId: number;

  @BelongsTo(() => User)
  user: User;
}