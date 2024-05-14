// import { Injectable } from '@nestjs/common';
// import { CreateUserInput } from './dto/create-user.input';
// import { User } from './entities/user.entity';

// @Injectable()
// export class UsersService {
//   // private readonly users: User[] = [];
//   private readonly users = [
//     { id: "234", email: "test@gmail.com", password: "password"},
//     { id: "123", email: "eiei@gmail.com", password: "password"}
//   ];

//   create(createUserInput: CreateUserInput) {
//     this.users.push(createUserInput);
//     return createUserInput;
//   }

//   findAll() {
//     return this.users;
//   }

//   findOne(id: string) {
//     return this.users.find((user) => user.id === id);
//   }
// }

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductInput } from './dto/create-product.input';
import { Product } from './entities/product.entity';
import { ObjectId } from 'mongoose';

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product.name) private productModel: Model<Product>) {}

  async create(createProductInput: CreateProductInput): Promise<Product> {
    const { body, authorId } = createProductInput;

    if (!body || !authorId) {
      throw new Error('body and authorId are required');
    }

    const createdProduct = new this.productModel({ body, authorId });
    return await createdProduct.save();
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).exec();
    if (!product || !product.body || !product.authorId) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async findAll(): Promise<Product[]> {
    const products = await this.productModel.find().exec();
    const validProducts = products.filter(product => product.body && product.authorId);
    return validProducts;
  }

  async forAuthor(authorId: string): Promise<Product[]> {
    const products = await this.productModel.find().exec();
    const validProducts = products.filter(product => product.authorId === authorId);
    return validProducts;
  }

  // async forAuthor(authorId: string): Promise<Product[]> {
  //   const authorObjectId = ObjectId(authorId);
  //   const products = await this.productModel.find({ authorId: authorObjectId }).exec();
  //   return products;
  // }

}



