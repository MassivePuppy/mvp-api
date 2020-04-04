import { Role } from 'src/role.interface';
import { User } from 'src/user/interfaces/user.interface';
import { TrainingPlanService } from 'src/trainingplan/trainingplan.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PosessionService {
    constructor(
        private readonly trainingPlanService: TrainingPlanService
    ) { }

    private readonly mapping = {
        users: this.ownsUser.bind(this),
        trainingplans: this.ownsTrainingPlan.bind(this)
    }

    async checkPosession(role: Role, user: User, request: any) {
        if (role.possession === 'any') {
            return new Promise(resolve => {
                resolve(false)
            })
        }

        return this.getOwnFunction(role.resource)(user, request)
    }

    getOwnFunction(resource: string): CallableFunction {
        return this.mapping[resource]
    }

    ownsUser(user: User, request: any) {
        return new Promise((resolve) => {
            const requestedUserId = String(request.params.id)
            const requestingUserId = String(user._id)
    
            resolve(requestedUserId === requestingUserId)
        })
    }

    ownsTrainingPlan(user: User, request: any) {
        return new Promise((resolve) => {
            this.trainingPlanService.getById(request.params.id).then(trainingPlan => {
                resolve(String(trainingPlan.userId) === String(user._id))
            })
        })
    }
}
