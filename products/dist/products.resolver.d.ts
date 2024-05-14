import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';
export declare class ProductsResolver {
    private readonly productsService;
    constructor(productsService: ProductsService);
    createProduct(createProductInput: CreateProductInput): Promise<Product>;
    findOne(id: string): Promise<Product>;
    findAll(): Promise<Product[]>;
    user(product: Product): any;
}
