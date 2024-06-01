type TypeUrlAuth = 'login' | 'register' | 'access_token'

export const enum EnumUrl {
	category = '/category/',
	review = '/review/',
	leaveReview = '/review/leave/',
	productReview = '/review/product-rating/',
	user = '/user/profile/',
	toggleFavoriteUser = 'user/profile/favorites/',
	order = '/order/',
	statistic = '/statistic/',
	payment = '/payment/',
	product = '/product/',
	similarProduct = 'product/similar/',
	productByCategorySlug = 'product/category/'
}

export const urlConfig = (url: EnumUrl | TypeUrlAuth) => {
	switch (url) {
		case 'login':
			return '/auth/login/'
		case 'access_token':
			return '/auth/login/access_token/'
		case 'register':
			return '/auth/register/'
		case EnumUrl.category:
			return '/category/'
		default:
			return ''
	}
}
