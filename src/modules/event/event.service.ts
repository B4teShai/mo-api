import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { QueryDto } from 'globals/dto/query.dto';
import { Event } from 'models/event.entity';
import { paginate } from 'utilities/pagination';
import { EventDto } from './event.dto';

@Injectable()
export class EventService {
  constructor(
    @InjectModel(Event) private readonly eventRepository: typeof Event,
  ) {}

  async findAll(query: QueryDto) {
    return await this.eventRepository.findAndCountAll({
      ...paginate(query),
    });
  }

  async findOne(id: number) {
    return await this.eventRepository.findByPk(id);
  }

  async create(event: EventDto) {
    return await this.eventRepository.create({ ...event });
  }

  async update(id: number, event: EventDto) {
    const [_, [affectedRows]] = await this.eventRepository.update(
      { ...event },
      { where: { id }, returning: ['*'] },
    );

    return affectedRows;
  }

  async delete(id: number) {
    return await this.eventRepository.destroy({ where: { id } });
  }
}
