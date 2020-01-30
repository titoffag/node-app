import { IUser } from '../entities/user.entity';

export class TUser implements IUser {
  constructor(
    public id: number,
    public login: string,
    public password: string,
    public age: number,
    public isDeleted: boolean,
  ) {}
}
