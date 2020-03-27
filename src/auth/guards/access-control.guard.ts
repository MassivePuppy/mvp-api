import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IQueryInfo } from 'accesscontrol';
import { Role } from 'src/role.interface';
import ac from 'src/app.roles';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/interfaces/user.interface';
import { PosessionService } from 'src/utils/posession.service';

@Injectable()
export class AccessControlGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly userService: UserService
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {

    const posessionService: PosessionService = new PosessionService();

    return new Promise((resolve, reject) => {
        const roles = this.reflector.get<Role[]>('roles', context.getHandler())

        if (!roles) {
          resolve(true)
        }
    
        const request = context.switchToHttp().getRequest()
        this.userService.getById(request.user._id).then((user: User) => {

            if (user.roles.length < 1) {
                return resolve(false)
            }

            const hasRoles = roles.every((role: Role) => {
                const clonedRole = { ...role }

                if (clonedRole.possession === 'own') {
                  const isOwner = posessionService.checkPosession(clonedRole, user, request)

                  if (!isOwner) {
                    clonedRole.possession = 'any'
                  }
                }

                const queryInfo: IQueryInfo = clonedRole
                queryInfo.role = user.roles

                return ac.permission(queryInfo).granted
            })

            resolve(hasRoles)
        })
    })
  }
}