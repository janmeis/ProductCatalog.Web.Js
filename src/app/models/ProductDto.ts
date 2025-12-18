import { IDomainDto } from './DomainDto';
import { ProductState } from './ProductState';
import { ProductOfferingType } from './ProductOfferingType';

export interface IProductDto extends IDomainDto {
  Code: string;
  ExternalCode: string;
  ExternalGroup: string;
  Name: string;
  Name2: string;
  NameEN: string;
  Order: number;
  State: ProductState;
  Type?: ProductOfferingType;
  LastStateChangeDate?: Date;
  PrintComposite: number;
}
