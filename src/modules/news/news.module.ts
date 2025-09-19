import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { News } from 'models/news.entity';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';

@Module({
  imports: [SequelizeModule.forFeature([News])],
  providers: [NewsService],
  controllers: [NewsController],
})
export class NewsModule {}
