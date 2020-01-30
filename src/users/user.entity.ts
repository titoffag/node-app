import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export interface IUser {
  id: number;
  login: string;
  password: string;
  age: number;
  isDeleted: boolean;
}

@Entity({ name: 'users' })
export class User implements IUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
    length: 255,
  })
  login: string;

  @Column({
    length: 255,
  })
  password: string;

  // TODO: check (age >= 4 AND age <= 130)
  @Column()
  age: number;

  @Column({
    name: 'isdeleted',
  })
  isDeleted: boolean;

  constructor(login: string, password: string, age: number, isDeleted?: boolean) {
    this.login = login;
    this.password = password;
    this.age = age;
    this.isDeleted = isDeleted;
  }
}
