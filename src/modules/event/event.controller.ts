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
import { EventService } from './event.service';
import { QueryDto } from 'globals/dto/query.dto';
import { EventDto } from './event.dto';
import { AuthGuard } from 'guards/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('events')
@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get()
  async findAll(@Query() query: QueryDto) {
    return await this.eventService.findAll(query);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() body: EventDto) {
    return await this.eventService.create(body);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.eventService.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() body: EventDto) {
    return await this.eventService.update(id, body);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.eventService.delete(id);
  }
}
