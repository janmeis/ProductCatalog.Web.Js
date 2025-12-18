import { IListOrder } from './ListOrder';
import { IPageInfo } from './PageInfo';

export interface IListFilter {
  Criteria: string[];
  Order: IListOrder;
  PageInfo: IPageInfo;
}
