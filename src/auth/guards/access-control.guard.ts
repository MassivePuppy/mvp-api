import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IQueryInfo } from 'accesscontrol';
import { Role } from 'src/role.interface';
import ac from 'src/app.roles';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/interfaces/user.interface';

@Injectable()
export class AccessControlGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly userService: UserService
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {

    return new Promise((resolve, reject) => {
        const roles = this.reflector.get<Role[]>('roles', context.getHandler())

        if (!roles) {
          resolve(true)
        }
    
        const request = context.switchToHttp().getRequest()
        const requestingUser = request.user
        
        this.userService.getById(requestingUser._id).then((user: User) => {

            if (user.roles.length < 1) {
                return resolve(false)
            }

            const hasRoles = roles.every((role: Role) => {

                const queryInfo: IQueryInfo = role
                queryInfo.role = user.roles

                return ac.permission(queryInfo).granted
            })

            resolve(hasRoles)
        })
    })
  }
}