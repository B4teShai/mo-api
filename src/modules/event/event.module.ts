import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Event } from 'models/event.entity';
import { EventService } from './event.service';
import { EventController } from './event.controller';

@Module({
  imports: [SequelizeModule.forFeature([Event])],
  providers: [EventService],
  controllers: [EventController],
})
export class EventModule {}
