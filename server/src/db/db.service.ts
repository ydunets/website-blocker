import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from 'generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

@Injectable()
export class DbService extends PrismaClient implements OnModuleInit {
  constructor() {
    const adapter = new PrismaPg({
      connectionString:
        'postgresql://user:password@localhost:7799/website_blocker_db?schema=public',
    });
    const prisma = new PrismaClient({ adapter });
    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
  }
}
