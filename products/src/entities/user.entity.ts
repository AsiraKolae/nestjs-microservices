import { ObjectType, Field, ID, Directive } from '@nestjs/graphql';
import { Product } from './product.entity';

@ObjectType()
@Directive('@key(fields: "id")')
export class User {
  @Field(() => ID)
  id: string;

  @Field(() => [Product])
  products?: Product[];
}