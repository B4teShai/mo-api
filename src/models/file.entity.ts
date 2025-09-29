import { Column, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table({
  tableName: 'file',
  timestamps: true,
})
export class File extends Model<File> {
  @PrimaryKey
  @Column({
    type: DataTypes.STRING(36),
    defaultValue: DataTypes.UUIDV4,
  })
  id: string;

  @Column
  size: number;

  @Column
  path: string;

  @Column
  filename: string;

  @Column({
    type: DataTypes.BLOB('long'),
  })
  data: Buffer;

  @Column
  mimeType: string;
}
