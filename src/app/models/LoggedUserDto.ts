import type { UserDto } from './UserDto';
import type { UserRoles } from './UserRoles';

export interface LoggedUserDto extends UserDto {
  Roles: UserRoles;
  Delegates: number[];
  Segments: number[];
}
