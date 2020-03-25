import { AccessControl } from 'accesscontrol'
import { Roles } from './constants/roles'
import { Domains } from './constants/domains'

const ac = new AccessControl()

ac.grant(Roles.ADMIN)
    .createAny(Domains.USERS)
    .deleteAny(Domains.USERS)
    .readAny(Domains.USERS)
    .updateAny(Domains.USERS)

ac.grant(Roles.USER)
    .readOwn(Domains.USERS)

export default ac