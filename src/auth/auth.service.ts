import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { HashUtil } from 'src/utils/hash';
import { User } from 'src/user/interfaces/user.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) { }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userService.getByEmail(email);

        if (!user) {
            return null
        }

        const result = await HashUtil.check(password, user.password)

        if (result) {
            return user
        }

        return null
    }

    async login(user: User) {
        const payload = { sub: user._id }

        return {
            access_token: this.jwtService.sign(payload)
        }
    }

}