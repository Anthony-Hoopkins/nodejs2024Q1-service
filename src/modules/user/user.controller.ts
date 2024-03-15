import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { UUID } from 'crypto';
import { ErrorMessageDictionary } from '../../core/consts/error.dictionary';

@Controller('user')
@ApiTags('User')
@UseInterceptors(ClassSerializerInterceptor)
@ApiResponse({
  status: HttpStatus.BAD_REQUEST,
  description: ErrorMessageDictionary.invalidId,
})
@ApiResponse({
  status: HttpStatus.NOT_FOUND,
  description: ErrorMessageDictionary.notFound,
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create User' })
  @ApiResponse({ status: HttpStatus.CREATED, type: User })
  async create(@Body() createUserDto: CreateUserDto) {
    return new User(await this.userService.create(createUserDto));
  }

  @Get()
  @ApiOperation({ summary: 'Get All Users' })
  @ApiResponse({ status: HttpStatus.OK, type: [User] })
  // findAll() {
  //   const allUsers: User[] = this.userService.findAll();
  //   return allUsers.map((user: User) => new User(user));
  // }
  async findAll() {
    const allUsers: User[] = await this.userService.findAll();
    return allUsers.map((user: User) => new User(user));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get User by Id' })
  @ApiResponse({ status: HttpStatus.OK, type: User })
  async findOne(@Param('id', ParseUUIDPipe) id: UUID) {
    const user = await this.userService.findOne(id);

    if (user) {
      return new User(user);
    }

    throw new HttpException(
      ErrorMessageDictionary.notFound,
      HttpStatus.NOT_FOUND,
    );
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update User by Id' })
  @ApiResponse({ status: HttpStatus.OK, type: User })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: ErrorMessageDictionary.wrongPassword,
  })
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ParseUUIDPipe) id: UUID,
    @Body() updateDto: UpdateUserDto,
  ): Promise<User> {
    const result = await this.userService.update(id, updateDto);

    switch (result.result) {
      case HttpStatus.OK:
        return new User(result.data);
      case HttpStatus.FORBIDDEN:
        throw new HttpException(
          ErrorMessageDictionary.wrongPassword,
          HttpStatus.FORBIDDEN,
        );
      case HttpStatus.NOT_FOUND:
        throw new HttpException(
          ErrorMessageDictionary.notFound,
          HttpStatus.NOT_FOUND,
        );
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove User by Id' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: ErrorMessageDictionary.noContent,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseUUIDPipe) id: UUID): Promise<void> {
    const user = await this.userService.remove(id);

    if (user) {
      return;
    }

    throw new HttpException(
      ErrorMessageDictionary.notFound,
      HttpStatus.NOT_FOUND,
    );
  }
}
