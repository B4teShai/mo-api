import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { QueryDto } from 'globals/dto/query.dto';
import { News } from 'models/news.entity';
import { paginate } from 'utilities/pagination';
import { NewsDto } from './news.dto';

@Injectable()
export class NewsService {
  constructor(@InjectModel(News) private newsModel: typeof News) {}

  async findAll(query: QueryDto) {
    return await this.newsModel.findAndCountAll({
      ...paginate(query),
    });
  }

  async findOne(id: number) {
    return await this.newsModel.findByPk(id);
  }

  async create(news: NewsDto) {
    return await this.newsModel.create({ ...news });
  }

  async update(id: number, news: NewsDto) {
    const [_, [rows]] = await this.newsModel.update(
      { ...news },
      { where: { id }, returning: ['*'] },
    );
    return rows;
  }

  async delete(id: number) {
    return await this.newsModel.destroy({ where: { id } });
  }
}
