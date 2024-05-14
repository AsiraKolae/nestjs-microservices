import { Product } from './entities/product.entity';
import { User } from './entities/user.entity';
import { ProductsService } from './products.service';
export declare class UsersResolver {
    private readonly productsService;
    constructor(productsService: ProductsService);
    products(user: User): Promise<Product[]>;
}
