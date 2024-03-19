import { HttpStatus, Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { UUID } from 'crypto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: any): Promise<User> {
    const date = +new Date();
    createUserDto.createdAt = date;
    createUserDto.updatedAt = date;

    return this.usersRepository.save(createUserDto);
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
    const user: User = await this.usersRepository.findOneBy({ id });

    if (!user) {
      return { result: HttpStatus.NOT_FOUND };
    }

    if (user.password !== updateUserDto.oldPassword) {
      return { result: HttpStatus.FORBIDDEN };
    }

    const updateUser = {
      ...user,
      password: updateUserDto.newPassword,
      createdAt: Number(user.createdAt),
      updatedAt: Number(new Date()),
      version: user.version + 1,
    };

    await this.usersRepository.update(id, updateUser);

    return { result: HttpStatus.OK, data: updateUser };
  }

  async remove(id: UUID): Promise<any> {
    return (await this.usersRepository.delete(id))?.affected > 0;
  }
}
