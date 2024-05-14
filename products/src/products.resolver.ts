import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { User } from './entities/user.entity';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Mutation(() => Product)
  createProduct(@Args('createProductInput') createProductInput: CreateProductInput) {
    return this.productsService.create(createProductInput);
  }

  @Query(() => Product, { name: 'product' })
  async findOne(@Args('id') id: string): Promise<Product> {
    return await this.productsService.findOne(id);
  }

  @Query(() => [Product], { name: 'products' })
  async findAll(): Promise<Product[]> {
    return await this.productsService.findAll();
  }

  @ResolveField(() => User)
  user(@Parent() product: Product): any {
    return { __typename: 'User', id: product.authorId };
  }
}
