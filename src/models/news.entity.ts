import { Column, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'News',
})
export class News extends Model {
  @Column
  title: string;

  @Column
  body: string;

  @Column
  thumbnail: string;
}
