import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Put,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { Auth } from 'src/auth/decorator/Auth.decorator'
import { CategoryService } from './category.service'
import { categoryDto } from './dto/category.dto'

@Controller('category')
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) {}

	@Get()
	getAll() {
		return this.categoryService.getAll()
	}

	@Get(':idSlug')
	getBy(@Param('idSlug') idSlug: string) {
		return this.categoryService.getBy(idSlug)
	}

	@Put(':id')
	@Auth()
	@HttpCode(200)
	@UsePipes(new ValidationPipe())
	update(@Param('id') id: string, @Body() dto: categoryDto) {
		return this.categoryService.update(+id, dto)
	}

	@Delete(':id')
	@Auth()
	@HttpCode(200)
	delete(@Param('id') id: string) {
		return this.categoryService.delete(+id)
	}

	@Post()
	@Auth()
	@HttpCode(200)
	create() {
		return this.categoryService.create()
	}
}
