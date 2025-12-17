export interface UserDto {
  Id: number;
  Name: string;
  Surname: string;
  Number: string;
  Login: string;
  Email: string;
  IsDeleted: boolean;
  Senior: string;
  DelegatedUser: string;
  Region: string;
  Function: string;
  Partner: string;
  LastChanged: Date;
  ChangedBy: string;
  BusinessChannelName: string;
  Seniority: string;
  Department: string;
  IsLocked4Synchronization?: boolean;
  Synchronized?: boolean;
  PocoId: any;
  DelegatedOn?: Date;
}
