import { instense } from '../api/api.interceptor'
import { EnumUrl } from '../config/url.config'
import { IPaymentResponse } from '../types/payment.interface'

class Payment {
	createPayment(amount: number) {
		return instense.post<IPaymentResponse>(EnumUrl.payment, {
			amount
		})
	}
}

export default new Payment()
