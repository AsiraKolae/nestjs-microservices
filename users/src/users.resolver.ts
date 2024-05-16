import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveReference,
} from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { AuthService } from './auth.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService, private readonly authService: AuthService) {}

  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput): Promise<User> {
    return await this.usersService.create(createUserInput);
  }

  // @Query(() => User)
  //   async findUserByEmailAndPassword(
  //     @Args('email') email: string,
  //     @Args('password') password: string,
  //   ): Promise<User> {
  //     return await this.usersService.findByEmailAndPassword(email, password);
  // }

  @Query(() => User, { name: 'userEmail' })
  async findOneByEmail(@Args('email') email: string): Promise<User> {
    return await this.usersService.findOneByEmail(email);
  }

  @Mutation(() => User) // ระบุชนิดของข้อมูลที่ loginUser จะคืนค่า
  async loginUser(
    @Args('email') email: string,
    @Args('password') password: string,
  ): Promise<User> { // ระบุชนิดของข้อมูลที่ loginUser จะคืนค่า
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new Error('Invalid email or password');
    }
    return user;
  }

  

  // @Query(() => User, { name: 'userEmail' })
  // async findOneByEmailAndPassword(
  //   @Args('email') email: string,
  //   @Args('password') password: string
  // ): Promise<User> {
  //   return await this.usersService.findOneByEmailAndPassword(email, password);
  // }

  @Query(() => User, { name: 'user' })
  async findOne(@Args('id') id: string): Promise<User> {
    return await this.usersService.findOne(id);
  }

  @Query(() => [User], { name: 'users' })
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @ResolveReference()
  async resolveReference(reference: { __typename: string; id: string }): Promise<User> {
    return await this.usersService.findOne(reference.id);
  }
}
