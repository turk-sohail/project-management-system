import { Injectable } from '@nestjs/common';
import { Rights } from '../utils/common';
import { RolesService } from './roles.service';
import { Roles } from './entities/role.entity';
interface RoleIds {
  roleIds: string[];
}

@Injectable()
export class RolesUtil {
  constructor(private readonly rolesService: RolesService) {}
  /**
   * Retrieves all possible permissions from the defined rights in the Rights object.
   * @returns {string[]} An array of permissions
   */
  getAllPermissionsFromRights(): string[] {
    // Initialize an empty array to collect values;
    let permissions = [];

    // Iterate through each section of the Rights object
    for (const module in Rights) {
      // Check if rights for ALL are defined for the current module
      if (Rights[module]['ALL']) {
        let sectionValues = Rights[module]['ALL'];
        sectionValues = sectionValues.split(',');
        permissions = [...permissions, ...sectionValues];
      }
    }
    // Return the collected permissions
    return permissions;
  }

  async checkValidRoleIds(role_ids: any) {
    // Query the database to check if all role_ids are valid
    const roles = await this.rolesService.findManyByIds(role_ids);
    return roles.length === role_ids.length;
    //return roles.data.length === role_ids.length;
  }
  /*

  async getAllRightsFromRoles(role_ids: string[]): Promise<string[]> {
    // Create an instance of RolesService to interact with the roles
    const roleService = new RolesService();

    // Initialize an array to store the collected rights
    let rights: string[] = [];

    // Query the database to validate the provided role_ids

    /*
    const queryData = await this.rolesService.findByIds(role_ids);
    const roles: Roles[] = queryData.data ? queryData.data : [];
    */

  // Extract rights from each role and add them to the rights array
  /*
    roles.forEach((role) => {
      const rightFromRole: string[] = role?.rights?.split(',');
      rights = [...new Set(rights.concat(rightFromRole))];
    });

    // Return the accumulated rights
    return rights;
   
  }
   */
}
