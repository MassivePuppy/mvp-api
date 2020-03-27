import { Role } from 'src/role.interface';
import { User } from 'src/user/interfaces/user.interface';

export class PosessionService {

    private readonly mapping = {
        users: this.ownsUser
    }

    constructor() { }

    checkPosession(role: Role, user: User, request: any) {
        return this.getOwnFunction(role.resource)(user, request)
    }

    getOwnFunction(resource: string): CallableFunction {
        return this.mapping[resource]
    }

    ownsUser(user: User, request: any) {
        const requestedUserId = String(request.params.id)
        const requestingUserId = String(user._id)

        return requestedUserId === requestingUserId
    }
}
