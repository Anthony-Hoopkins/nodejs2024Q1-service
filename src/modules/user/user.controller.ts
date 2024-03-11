import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete, ClassSerializerInterceptor, UseInterceptors, HttpCode,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { UUID } from 'crypto';
import { StatusCodes } from 'http-status-codes';

@ApiTags('User')
@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Create User' })
  @ApiResponse({ status: StatusCodes.CREATED, type: User })
  @Post()
  // @HttpCode(204)
  create(@Body() createUserDto: CreateUserDto) {
    return new User(this.userService.create(createUserDto));
  }

  @ApiOperation({ summary: 'Get All Users' })
  @ApiResponse({ status: 200, type: [User] })
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @ApiOperation({ summary: 'Get User by Id' })
  @ApiResponse({ status: 200, type: User })
  // @ApiResponse({ status: StatusCodes.NO_CONTENT, type: User })
  @Get(':id')
  findOne(@Param('id') id: UUID) {
    return this.userService.findOne(id);
  }

  @ApiOperation({ summary: 'Update User by Id' })
  @ApiResponse({ status: 200, type: User })
  @Patch(':id')
  update(@Param('id') id: UUID, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @ApiOperation({ summary: 'Remove User by Id' })
  @ApiResponse({ status: StatusCodes.NO_CONTENT, type: User })
  @HttpCode(StatusCodes.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id') id: UUID) {
    return this.userService.remove(id);
  }
}
