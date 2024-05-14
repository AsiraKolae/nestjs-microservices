import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Product } from './entities/product.entity';
import { User } from './entities/user.entity';
import { ProductsService } from './products.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly productsService: ProductsService) {}

  @ResolveField(() => [Product])
  async products(@Parent() user: User): Promise<Product[]> {
    return await this.productsService.forAuthor(user.id);
  }
}
