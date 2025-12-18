import { ILogDto as ILogDto } from './LogDto';
import { UpdateMode } from './UpdateMode';

export interface IDomainDto extends ILogDto {
  UpdateMode: UpdateMode;
  Version: string;
}
