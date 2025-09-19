import { Column, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'Events',
})
export class Event extends Model {
  @Column
  title: string;

  @Column
  body: string;

  @Column
  thumbnail: string;
}
