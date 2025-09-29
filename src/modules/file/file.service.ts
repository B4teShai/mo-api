import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { File as FileModel } from 'models/file.entity';
import { File } from '@nest-lab/fastify-multer';
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FileService {
  private s3Client: S3Client;

  constructor(
    @InjectModel(FileModel) private readonly fileRepository: typeof FileModel,
    private configService: ConfigService,
  ) {
    this.s3Client = new S3Client({
      endpoint: this.configService.get('SUPABASE_STORAGE_URL'),
      credentials: {
        accessKeyId: this.configService.get('SUPABASE_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get('SUPABASE_SECRET_ACCESS_KEY'),
      },
      region: 'ap-southeast-1', // Supabase uses this region
      forcePathStyle: true,
    });
  }

  async uploadFile(file: File) {
    const key = `${Date.now()}-${file.originalname}`;
    const bucketName = this.configService.get('SUPABASE_BUCKET_NAME');

    const uploadParams = {
      Bucket: bucketName,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    try {
      await this.s3Client.send(new PutObjectCommand(uploadParams));

      const publicUrl = `https://jimuqcexytslhjueyhnw.supabase.co/storage/v1/object/public/${bucketName}/${key}`;

      const fileRecord = await this.fileRepository.create({
        filename: file.originalname,
        size: file.size,
        mimeType: file.mimetype,
        path: key,
        url: publicUrl,
      });

      return {
        id: fileRecord.id,
        path: fileRecord.path,
        filename: fileRecord.filename,
        size: fileRecord.size,
        url: fileRecord.url,
      };
    } catch (error) {
      throw new Error(`Failed to upload file: ${error.message}`);
    }
  }

  async getFile(id: string) {
    try {
      const fileRecord = await this.fileRepository.findByPk(id);
      if (!fileRecord) {
        throw new Error(`File not found with id: ${id}`);
      }

      return {
        url: fileRecord.url,
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
        where: { path },
      });
      if (!fileRecord) {
        throw new Error(`File not found at path: ${path}`);
      }

      return {
        url: fileRecord.url,
        filename: fileRecord.filename,
        mimeType: fileRecord.mimeType,
        size: fileRecord.size,
      };
    } catch (error) {
      throw new Error(`File not found at path: ${path}`);
    }
  }

  async getSignedUrl(id: string, expiresIn = 3600) {
    try {
      const fileRecord = await this.fileRepository.findByPk(id);
      if (!fileRecord) {
        throw new Error(`File not found with id: ${id}`);
      }

      const bucketName = this.configService.get('SUPABASE_BUCKET_NAME');
      const command = new GetObjectCommand({
        Bucket: bucketName,
        Key: fileRecord.path,
      });

      const signedUrl = await getSignedUrl(this.s3Client, command, {
        expiresIn,
      });

      return {
        signedUrl,
        filename: fileRecord.filename,
        mimeType: fileRecord.mimeType,
        size: fileRecord.size,
      };
    } catch (error) {
      throw new Error(`Failed to generate signed URL: ${error.message}`);
    }
  }
}
