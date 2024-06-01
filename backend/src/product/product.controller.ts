import {
	Controller,
	Delete,
	Get,
	Param,
	Query,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { Auth } from 'src/auth/decorator/Auth.decorator'
import { GetAllProductsDto } from './dto/getAllProductsDto'
import { ProductService } from './product.service'

@Controller('product')
export class ProductController {
	constructor(private readonly productService: ProductService) {}

	@UsePipes(new ValidationPipe())
	@Get()
	async getAll(@Query() queryDto: GetAllProductsDto) {
		return this.productService.getAll(queryDto)
	}

	@Get('similar/:id')
	async getSimilar(@Param('id') id: string) {
		return this.productService.getSimilar(+id)
	}

	@Get(':id')
	async getBy(@Param('id') id: string) {
		return this.productService.getBy(id)
	}

	@Get('category/:categorySlug')
	async getByCategory(@Param('categorySlug') categorySlug: string) {
		return this.productService.getByCategory(categorySlug)
	}

	@Delete(':id')
	@Auth()
	async delete(@Param('id') id: string) {
		return this.productService.delete(+id)
	}
}
