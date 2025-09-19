import {
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileService } from './file.service';
import { FileInterceptor, File } from '@nest-lab/fastify-multer';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  singleFile(@UploadedFile() file: File) {
    return this.fileService.uploadFile(file);
  }
  @Get(':path')
  async getFile(@Param('path') path: string) {
    return await this.fileService.getFile(path);
  }
}
