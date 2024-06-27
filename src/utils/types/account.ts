import { Roles } from './roles'
import { User } from './user'

export type Account = Pick<User, 'name' | 'email' | 'id'> & {
  roles: Roles
}
