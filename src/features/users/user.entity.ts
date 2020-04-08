import { Check, Column, Entity, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';

import { Group } from '../users';

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

  @Column()
  @Check(`"age" >= 4 "AND" "age" <= 130`)
  age: number;

  @Column({
    name: 'isdeleted',
  })
  isDeleted: boolean;

  // todo: todo
  @ManyToMany(() => Group, group => group.users)
  users: Promise<Group[]>;

  constructor(login: string, password: string, age: number, isDeleted?: boolean) {
    this.login = login;
    this.password = password;
    this.age = age;
    this.isDeleted = isDeleted;
  }
}
