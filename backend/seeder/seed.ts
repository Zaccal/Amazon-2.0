import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv'

dotenv.config()

const prisma = new PrismaClient()

const createProducts = async (count: number) => {
	const products = []

	for (let index = 0; index < count; index++) {
		const nameProduct = faker.commerce.productName()
		const newPoroduct = {
			name: nameProduct,
			description: faker.commerce.productDescription(),
			imeges: Array.from({
				length: faker.helpers.rangeToNumber({ min: 2, max: 5 })
			}).map(() => faker.image.url()),
			price: faker.helpers.rangeToNumber({ min: 100, max: 999 }),
			sku: faker.helpers.rangeToNumber({ min: 10_000, max: 99_000 }) + '',
			slug: faker.helpers.slugify(nameProduct),
			// category: {
			// 	connect: {
			// 		id: faker.helpers.rangeToNumber({ min: 1, max: 9 })
			// 	}
			// },
			categoryId: faker.helpers.rangeToNumber({ min: 1, max: 9 }),
			// reviews: {
			// 	create: [
			// 		{
			// 			rating: faker.helpers.rangeToNumber({
			// 				min: 1,
			// 				max: 5
			// 			}),
			// 			text: faker.lorem.paragraph(),
			// 			user: {
			// 				connect: {
			// 					id: 1
			// 				}
			// 			}
			// 		},
			// 		{
			// 			rating: faker.helpers.rangeToNumber({
			// 				min: 1,
			// 				max: 5
			// 			}),
			// 			text: faker.lorem.paragraph(),
			// 			user: {
			// 				connect: {
			// 					id: 1
			// 				}
			// 			}
			// 		}
			// 	]
			// },
			userId: 1
		}

		products.push(newPoroduct)
	}

	console.log(products)

	await prisma.product.createMany({
		data: products,
		skipDuplicates: true
	})
	console.log(`Created ${products.length} products`)
}

const createCategories = async (count: number) => {
	const categories = []

	for (let index = 0; index < count; index++) {
		const name = faker.commerce.department()
		const category = {
			name: name,
			slag: faker.helpers.slugify(name)
		}
		categories.push(category)
	}

	await prisma.category.createMany({
		data: categories,
		skipDuplicates: true
	})

	console.log(categories)

	console.log(`Created ${categories.length} products`)
}

const createReviews = async () => {
	const reviews = []

	for (let index = 61; index <= 77; index++) {
		for (
			let countReview = 0;
			countReview <= faker.helpers.rangeToNumber({ min: 12, max: 20 });
			countReview++
		) {
			if (index !== 67) {
				const newReview = {
					productId: index,
					rating: faker.helpers.rangeToNumber({ min: 1, max: 5 }),
					text: faker.lorem.paragraphs(),
					userId: 1
				}

				reviews.push(newReview)
			}
		}
	}

	await prisma.review.createMany({
		data: reviews,
		skipDuplicates: true
	})

	console.log(`Created ${reviews.length} products`)
}

async function main() {
	console.log('Start seeding...')
	await createReviews()
	console.log('Seeding has finished.')
}

main()
	.catch(e => console.error(e))
	.finally(async () => {
		await prisma.$disconnect()
	})
