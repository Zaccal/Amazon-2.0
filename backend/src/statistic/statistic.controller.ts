import { Controller, Get } from '@nestjs/common'
import { Auth } from 'src/auth/decorator/Auth.decorator'
import { CurrentUser } from 'src/auth/decorator/User.decorator'
import { StatisticService } from './statistic.service'

@Controller('statistic')
export class StatisticController {
	constructor(private readonly statisticService: StatisticService) {}

	@Get()
	@Auth()
	getAll(@CurrentUser('id') id: number) {
		return this.statisticService.getMain(id)
	}
}
