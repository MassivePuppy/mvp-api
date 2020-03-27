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

export default ac