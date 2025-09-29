import {
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
  Res,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { FileService } from './file.service';
import { FileInterceptor, File } from '@nest-lab/fastify-multer';
import { FastifyReply } from 'fastify';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  singleFile(@UploadedFile() file: File) {
    return this.fileService.uploadFile(file);
  }

  @Get('id/:id')
  async getFileById(@Param('id') id: string) {
    try {
      const file = await this.fileService.getFile(id);
      return file;
    } catch (error) {
      throw new HttpException('File not found', HttpStatus.NOT_FOUND);
    }
  }

  @Get('id/:id/url')
  async getFileUrl(@Param('id') id: string) {
    try {
      const file = await this.fileService.getFile(id);
      return { url: file.url };
    } catch (error) {
      throw new HttpException('File not found', HttpStatus.NOT_FOUND);
    }
  }

  @Get('signed/:id')
  async getSignedUrl(@Param('id') id: string) {
    try {
      const result = await this.fileService.getSignedUrl(id);
      return result;
    } catch (error) {
      throw new HttpException('File not found', HttpStatus.NOT_FOUND);
    }
  }

  @Get(':path')
  async getFile(@Param('path') path: string) {
    try {
      const file = await this.fileService.getFileByPath(path);
      return file;
    } catch (error) {
      throw new HttpException('File not found', HttpStatus.NOT_FOUND);
    }
  }
}
