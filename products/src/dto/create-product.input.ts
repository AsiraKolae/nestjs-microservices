import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateProductInput {
  @Field()
  id: string;

  @Field()
  body: string;

  @Field()
  authorId: string;
}
