import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { RolesUtil } from '../roles/roles.util';
import { RolesModule } from '../roles/roles.module';

@Module({
  imports: [TypeOrmModule.forFeature([Users]), RolesModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
