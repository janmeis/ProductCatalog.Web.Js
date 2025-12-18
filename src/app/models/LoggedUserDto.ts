import type { IUserDto } from './UserDto';
import type { UserRoles } from './UserRoles';

export interface ILoggedUserDto extends IUserDto {
  Roles: UserRoles;
  Delegates: number[];
  Segments: number[];
}
