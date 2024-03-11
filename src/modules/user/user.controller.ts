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

@ApiTags('User')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Create User' })
  @ApiResponse({ status: HttpStatus.CREATED, type: User })
  @Post()
  // @HttpCode(204)
  create(@Body() createUserDto: CreateUserDto) {
    return new User(this.userService.create(createUserDto));
  }

  @ApiOperation({ summary: 'Get All Users' })
  @ApiResponse({ status: HttpStatus.OK, type: [User] })
  @Get()
  findAll() {
    const allUsers: User[] = this.userService.findAll();
    return allUsers.map((user: User) => new User(user));
  }

  @ApiOperation({ summary: 'Get User by Id' })
  @ApiResponse({ status: HttpStatus.OK, type: User })
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: UUID) {
    const user = this.userService.findOne(id);

    if (user) {
      return new User(user);
    }

    throw new HttpException(
      ErrorMessageDictionary.notFound,
      HttpStatus.NOT_FOUND,
    );
  }

  @ApiOperation({ summary: 'Update User by Id' })
  @ApiResponse({ status: HttpStatus.OK, type: User })
  @HttpCode(HttpStatus.OK)
  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: UUID,
    @Body() updateUserDto: UpdateUserDto,
  ): User {
    const result = this.userService.update(id, updateUserDto);

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

  @ApiOperation({ summary: 'Remove User by Id' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: UUID): void {
    const user = this.userService.remove(id);

    if (user) {
      return;
    }

    throw new HttpException(
      ErrorMessageDictionary.notFound,
      HttpStatus.NOT_FOUND,
    );
  }
}
