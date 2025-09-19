import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { File as FileModel } from 'models/file.entity';
import { readFile } from 'fs/promises';
import { File } from '@nest-lab/fastify-multer';
import { join } from 'path';
import { writeFile } from 'fs/promises';
@Injectable()
export class FileService {
  constructor(
    @InjectModel(FileModel) private readonly fileReposiroty: typeof FileModel,
  ) {}

  async uploadFile(file: File) {
    const uploadPath = join(__dirname, '../../../uploads');
    const id = `${Date.now()}-${file.originalname}`;
    const filePath = join(uploadPath, id);

    await writeFile(filePath, file.buffer);

    return {
      path: id,
    };
  }

  async getFile(path: string) {
    const filePath = join(__dirname, '../../../uploads', path);
    try {
      const fileBuffer = await readFile(filePath);
      return fileBuffer;
    } catch (error) {
      throw new Error(`File not found at path: ${path}`);
    }
  }
}
