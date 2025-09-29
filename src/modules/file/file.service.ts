import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { File as FileModel } from 'models/file.entity';
import { File } from '@nest-lab/fastify-multer';

@Injectable()
export class FileService {
  constructor(
    @InjectModel(FileModel) private readonly fileRepository: typeof FileModel,
  ) {}

  async uploadFile(file: File) {
    const fileRecord = await this.fileRepository.create({
      filename: file.originalname,
      size: file.size,
      data: file.buffer,
      mimeType: file.mimetype,
      path: `${Date.now()}-${file.originalname}`, // Keep for backward compatibility
    });

    return {
      id: fileRecord.id,
      path: fileRecord.path,
      filename: fileRecord.filename,
      size: fileRecord.size,
    };
  }

  async getFile(id: string) {
    try {
      const fileRecord = await this.fileRepository.findByPk(id);
      if (!fileRecord) {
        throw new Error(`File not found with id: ${id}`);
      }
      
      return {
        data: fileRecord.data,
        filename: fileRecord.filename,
        mimeType: fileRecord.mimeType,
        size: fileRecord.size,
      };
    } catch (error) {
      throw new Error(`File not found with id: ${id}`);
    }
  }

  async getFileByPath(path: string) {
    try {
      const fileRecord = await this.fileRepository.findOne({
        where: { path }
      });
      if (!fileRecord) {
        throw new Error(`File not found at path: ${path}`);
      }
      
      return {
        data: fileRecord.data,
        filename: fileRecord.filename,
        mimeType: fileRecord.mimeType,
        size: fileRecord.size,
      };
    } catch (error) {
      throw new Error(`File not found at path: ${path}`);
    }
  }
}
