import {
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Roles } from './entities/role.entity';
import { Any, In, Repository } from 'typeorm';
import u from 'uuid';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Roles)
    private rolesRepository: Repository<Roles>,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    const isRoleExist = await this.rolesRepository.findOne({
      where: { name: createRoleDto.name },
    });
    if (isRoleExist) {
      throw new ConflictException('This role already exist try another');
    }

    try {
      const roles = this.rolesRepository.create(createRoleDto);
      await this.rolesRepository.save(roles);
      return roles;
    } catch (error) {
      throw Error('Failed to create role');
    }
  }

  async findAll() {
    return await this.rolesRepository.find();
  }

  async findOne(id: any) {
    try {
      const role = await this.rolesRepository.findOneBy(id);
      if (!role) {
        throw new NotFoundException();
      }
      return role;
    } catch (error) {
      throw error;
    }
  }

  async update(id: any, updateRoleDto: UpdateRoleDto) {
    try {
      const role = await this.findOne(id);
      const updatedRole = { ...role, ...updateRoleDto };
      await this.rolesRepository.save(updatedRole);
      return updatedRole;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: any) {
    const role = await this.findOne(id);
    if (!role) {
      throw new NotFoundException('Role does not exist');
    }
    await this.rolesRepository.remove(role);
    return {
      statusCode: HttpStatus.OK,
      message: 'Deleted successfully',
    };
  }

  async findManyByIds(role_ids: string[]) {
    const roleIds = [];
    role_ids.forEach((r) => roleIds.push(r));
    const ids = await this.rolesRepository.findBy({
      role_id: Any(roleIds),
    });

    return ids;
  }

  createDefaultRole() {}
}
