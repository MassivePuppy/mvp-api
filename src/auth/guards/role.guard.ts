import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from 'src/user/interfaces/user.interface';
import { UserService } from 'src/user/user.service';
import { Roles } from 'src/constants/roles';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector, private readonly userService: UserService) {}

  canActivate(context: ExecutionContext): Promise<boolean> {
    return new Promise((resolve, reject) => {
        const role = this.reflector.get<string[]>('role', context.getHandler())

        if (!role) {
          resolve(true)
        }

        const request = context.switchToHttp().getRequest()
    
        this.userService.getById(request.user._id).then((user: User) => {
            resolve(user.roles.includes(Roles.ADMIN))
        })
    })
  }
}