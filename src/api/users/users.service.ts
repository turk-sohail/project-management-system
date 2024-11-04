import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RolesUtil } from '../roles/roles.util';
import { bcryptCompare, encryptString } from '../utils/common';
import { LoginUserDto } from './dto/login-user.dto';
import * as jwt from 'jsonwebtoken';
import {
  JWT_SECRET,
  ACCESS_TOKEN_EXPIRY_TIME_SECONDS,
  REFRESH_TOKEN_EXPIRY_TIME_SECONDS,
} from '../config/server-config';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    private rolesUtil: RolesUtil,
  ) {}

  async create(createUserDto: CreateUserDto) {
    // const { role_ids } = createUserDto;
    // const checkValidRoleIds = await this.rolesUtil.checkValidRoleIds(role_ids);
    // if (!checkValidRoleIds) {
    //   throw new BadRequestException('Bad role ids');
    // }
    const { password } = createUserDto;
    const hash = await encryptString(password);
    const user = this.usersRepository.create(createUserDto);
    user.password = hash;
    return this.usersRepository.save(user);
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    const user = await this.usersRepository.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const isValid = await bcryptCompare(password, user.password);
    if (!isValid) {
      throw new UnauthorizedException('User is not Valid');
    }

    const accessToken: string = jwt.sign(
      {
        email: user.email,

        username: user.username,
      },
      JWT_SECRET,
      { expiresIn: ACCESS_TOKEN_EXPIRY_TIME_SECONDS },
    );

    const refreshToken: string = jwt.sign(
      {
        email: user.email,

        username: user.username,
      },
      JWT_SECRET,
      { expiresIn: REFRESH_TOKEN_EXPIRY_TIME_SECONDS },
    );

    return {
      statusCode: 200,
      status: 'success',
      data: {
        accessToken,
        refreshToken,
      },
    };
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
