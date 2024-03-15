import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { OrmSimulation } from '../../../database/orm-simulation';
import { UUID } from 'crypto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  private orm = new OrmSimulation(OrmSimulation.entityTypes.Users);

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    // return this.orm.createEntity(createUserDto);
    const dto: User = createUserDto as User;

    return this.usersRepository.create(dto);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: UUID): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }

  async update(
    id: UUID,
    updateUserDto: UpdateUserDto,
  ): Promise<{ result: HttpStatus; data?: any }> {
    // const user = this.orm.getSingleEntity(id);
    const user: User = await this.usersRepository.findOneBy({ id });

    if (!user) {
      return { result: HttpStatus.NOT_FOUND };
    }

    if (user.password !== updateUserDto.oldPassword) {
      return { result: HttpStatus.FORBIDDEN };
    }

    const updateUser = { ...user, password: updateUserDto.newPassword };

    // updateUser = await this.orm.updateEntity(id, updateUser);
    await this.usersRepository.update({ id }, updateUser);

    return { result: HttpStatus.OK, data: updateUser };
  }

  remove(id: UUID): Promise<any> {
    // return this.orm.removeEntity(id);
    return this.usersRepository.delete(id);
  }
}
