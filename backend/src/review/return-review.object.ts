import { Prisma } from '@prisma/client'

export const returnReviewObject: Prisma.ReviewSelect = {
	rating: true,
	id: true,
	text: true,
	user: {
		select: {
			id: true,
			name: true,
			avatarPath: true
		}
	}
}
