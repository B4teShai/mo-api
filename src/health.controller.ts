import { Controller, Get } from '@nestjs/common';

@Controller()
export class HealthController {
  @Get('health')
  getHealth() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
      version: process.env.npm_package_version || '1.0.0',
    };
  }

  @Get()
  getRoot() {
    return {
      message: 'Mo API is running!',
      version: '1.0.0',
      docs: '/swagger',
      health: '/health',
    };
  }
}
