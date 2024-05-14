import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from './user.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@ObjectType()
export class Product {
  @Field(() => ID)
  id: string;

  @Field()
  body: string;

  @Field()
  authorId: string;

  @Field(() => User)
  user?: User;
}

const productMongooseSchema = new mongoose.Schema({
  body: { type: String, required: true }, 
  authorId: { type: String, required: true },
});

export const ProductSchema = SchemaFactory.createForClass(Product).add(productMongooseSchema);
