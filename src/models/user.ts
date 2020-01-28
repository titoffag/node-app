export interface IUser {
  id: string;
  login: string;
  password: string;
  age: number;
  isDeleted: boolean;
}

export class User implements IUser {
  constructor(
    public id: string,
    public login: string,
    public password: string,
    public age: number,
    public isDeleted: boolean,
  ) {}

  toString(): string {
    return `#${this.id} login: ${this.login} password: ${this.password} age: ${this.age} isDeleted: ${this.isDeleted}`;
  }
}
