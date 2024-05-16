import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { AuthService } from './auth.service';
export declare class UsersResolver {
    private readonly usersService;
    private readonly authService;
    constructor(usersService: UsersService, authService: AuthService);
    createUser(createUserInput: CreateUserInput): Promise<User>;
    findOneByEmail(email: string): Promise<User>;
    loginUser(email: string, password: string): Promise<User>;
    findOne(id: string): Promise<User>;
    findAll(): Promise<User[]>;
    resolveReference(reference: {
        __typename: string;
        id: string;
    }): Promise<User>;
}
