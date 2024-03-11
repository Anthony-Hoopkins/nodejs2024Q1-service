import { Injectable } from '@nestjs/common';
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

  findAll() {
    return this.orm.getAllEntities();
  }

  findOne(id: UUID) {
    return this.orm.getSingleEntity(id);
  }

  update(id: UUID, updateUserDto: UpdateUserDto) {
    return this.orm.updateEntity(id, updateUserDto);
  }

  remove(id: UUID) {
    return this.orm.removeEntity(id);
  }
}
