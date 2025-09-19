import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { NewsService } from './news.service';
import { AuthGuard } from 'guards/auth.guard';
import { QueryDto } from 'globals/dto/query.dto';
import { NewsDto } from './news.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('news')
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  async findAll(@Query() query: QueryDto) {
    return await this.newsService.findAll(query);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() news: NewsDto) {
    return await this.newsService.create(news);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.newsService.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() news: NewsDto) {
    return await this.newsService.update(id, news);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.newsService.delete(id);
  }
}
