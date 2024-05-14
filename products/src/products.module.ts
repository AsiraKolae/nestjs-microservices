import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsResolver } from './products.resolver';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './entities/product.entity';
import { UsersResolver } from './users.resolver';

@Module({
  imports: [
  GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
      },
    }),
    // MongooseModule.forRoot('mongodb+srv://AsiraKolae:AcWVICx2vcgHbQ0m@nestjs.75txxey.mongodb.net/NestJs'),
    MongooseModule.forRoot('mongodb+srv://Asira:test@nestjs.75txxey.mongodb.net/NestJs'),
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  providers: [ProductsResolver, ProductsService, UsersResolver],
})
export class ProductsModule {}