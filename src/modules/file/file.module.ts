import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { File } from 'models/file.entity';
import { FastifyMulterModule } from '@nest-lab/fastify-multer';
@Module({
  imports: [SequelizeModule.forFeature([File]), FastifyMulterModule],
  providers: [FileService],
  controllers: [FileController],
})
export class FileModule {}
