import { AccessControl } from 'accesscontrol'
import { Roles } from './constants/roles'
import { Domains } from './constants/domains'

const ac = new AccessControl()

ac.grant(Roles.ADMIN)
    .readAny(Domains.USERS)
    .updateAny(Domains.USERS)
    .deleteAny(Domains.USERS)

ac.grant(Roles.USER)
    .readOwn(Domains.USERS)
    .updateOwn(Domains.USERS)
    .deleteOwn(Domains.USERS)

ac.grant(Roles.ADMIN)
    .readAny(Domains.TRAINING_PLANS)
    .createAny(Domains.TRAINING_PLANS)
    .updateAny(Domains.TRAINING_PLANS)
    .deleteAny(Domains.TRAINING_PLANS)

ac.grant(Roles.USER)
    .readOwn(Domains.TRAINING_PLANS)
    .createAny(Domains.TRAINING_PLANS)
    .updateOwn(Domains.TRAINING_PLANS)
    .deleteOwn(Domains.TRAINING_PLANS)

export default ac