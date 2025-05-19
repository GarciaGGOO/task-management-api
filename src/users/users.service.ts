import { Injectable } from '@nestjs/common';
import { UserDto } from './user.dto';
import { v4 as uuidv4 } from 'uuid';
import { hashSync as bcryptHashSync } from 'bcrypt';

@Injectable()
export class UsersService {
  private readonly users: UserDto[] = [];

  create(newUser: UserDto) {
    newUser.id = uuidv4();
    newUser.password = bcryptHashSync(newUser.password, 10);
    this.users.push(newUser);
    console.log(this.users);
  }
}
