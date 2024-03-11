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

  @Post()
  @ApiOperation({ summary: 'Create User' })
  @ApiResponse({ status: HttpStatus.CREATED, type: User })
  create(@Body() createUserDto: CreateUserDto) {
    return new User(this.userService.create(createUserDto));
  }

  @Get()
  @ApiOperation({ summary: 'Get All Users' })
  @ApiResponse({ status: HttpStatus.OK, type: [User] })
  findAll() {
    const allUsers: User[] = this.userService.findAll();
    return allUsers.map((user: User) => new User(user));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get User by Id' })
  @ApiResponse({ status: HttpStatus.OK, type: User })
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

  @Put(':id')
  @ApiOperation({ summary: 'Update User by Id' })
  @ApiResponse({ status: HttpStatus.OK, type: User })
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id', ParseUUIDPipe) id: UUID,
    @Body() updateDto: UpdateUserDto,
  ): User {
    const result = this.userService.update(id, updateDto);

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
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @HttpCode(HttpStatus.NO_CONTENT)
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
