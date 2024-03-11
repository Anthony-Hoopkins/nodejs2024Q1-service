import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { OrmSimulation } from '../../../database/orm-simulation';
import { UUID } from 'crypto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  private orm = new OrmSimulation(OrmSimulation.entityTypes.Users);

  create(createUserDto: CreateUserDto): User {
    return this.orm.createEntity(createUserDto);
  }

  findAll(): User[] {
    return this.orm.getAllEntities();
  }

  findOne(id: UUID) {
    return this.orm.getSingleEntity(id);
  }

  update(
    id: UUID,
    updateUserDto: UpdateUserDto,
  ): { result: HttpStatus; data?: any } {
    const user = this.orm.getSingleEntity(id);

    if (!user) {
      return { result: HttpStatus.NOT_FOUND };
    }

    if (user.password !== updateUserDto.oldPassword) {
      return { result: HttpStatus.FORBIDDEN };
    }

    let updateUser = { ...user, password: updateUserDto.newPassword };

    updateUser = this.orm.updateEntity(id, updateUser);

    return { result: HttpStatus.OK, data: updateUser };
  }

  remove(id: UUID) {
    return this.orm.removeEntity(id);
  }
}
