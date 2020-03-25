import { SetMetadata } from '@nestjs/common';
import { Role } from '../role.interface';

export const UseRoles = (...roles: Role[]) => SetMetadata('roles', roles);