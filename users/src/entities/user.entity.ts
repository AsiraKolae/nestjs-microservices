import { ObjectType, Field, ID, Directive } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@ObjectType()
@Directive('@key(fields: "id")')
export class User {
  @Field(() => ID)
  id: string;

  @Field({ nullable: false })
  email?: string;

  @Field({ nullable: false })
  password?: string;
}

const userMongooseSchema = new mongoose.Schema({
  email: { type: String, required: true }, 
  password: { type: String, required: true },
});

export const UserSchema = SchemaFactory.createForClass(User).add(userMongooseSchema);
