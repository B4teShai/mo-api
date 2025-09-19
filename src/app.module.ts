import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { SequelizeConfigModule } from './modules/db/sequelize.module';
import { UserModule } from './modules/user/user.module';
import { NewsModule } from './modules/news/news.module';
import { EventModule } from './modules/event/event.module';
import { FileModule } from './modules/file/file.module';
import { HealthController } from './health.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeConfigModule,
    UserModule,
    AuthModule,
    NewsModule,
    EventModule,
    FileModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
