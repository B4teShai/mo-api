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
  async getFileById(@Param('id') id: string, @Res() res: FastifyReply) {
    try {
      const file = await this.fileService.getFile(id);
      
      res.header('Content-Type', file.mimeType);
      res.header('Content-Length', file.size.toString());
      res.header('Content-Disposition', `inline; filename="${file.filename}"`);
      
      return res.send(file.data);
    } catch (error) {
      throw new HttpException('File not found', HttpStatus.NOT_FOUND);
    }
  }

  @Get(':path')
  async getFile(@Param('path') path: string, @Res() res: FastifyReply) {
    try {
      const file = await this.fileService.getFileByPath(path);
      
      res.header('Content-Type', file.mimeType);
      res.header('Content-Length', file.size.toString());
      res.header('Content-Disposition', `inline; filename="${file.filename}"`);
      
      return res.send(file.data);
    } catch (error) {
      throw new HttpException('File not found', HttpStatus.NOT_FOUND);
    }
  }
}
