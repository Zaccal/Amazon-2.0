import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { PaginationService } from './pagination.service'

@Module({
	controllers: [],
	providers: [PaginationService, PrismaService],
	exports: [PaginationService]
})
export class PaginationModule {}
