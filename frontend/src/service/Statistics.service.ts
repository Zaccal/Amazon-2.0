import { instense } from '../api/api.interceptor'
import { EnumUrl } from '../config/url.config'
import { IStatistic } from '../types/Statistics.interface'

class Statistics {
	getAll() {
		return instense<IStatistic[]>({
			url: EnumUrl.statistic,
			method: 'GET'
		})
	}
}

export default new Statistics()
