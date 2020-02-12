import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

import { User } from '../users';

export type Permission = 'READ' | 'WRITE' | 'DELETE' | 'SHARE' | 'UPLOAD_FILES';

export interface IGroup {
  id: number;
  name: string;
  permissions: Array<Permission>;
}

@Entity({ name: 'groups' })
export class Group implements IGroup {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
    length: 255,
  })
  name: string;

  @Column('simple-array', { array: true })
  permissions: Array<Permission>;

  @ManyToMany(() => User, { cascade: true })
  @JoinTable({
    name: 'groups_users',
    joinColumn: { name: 'group_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'user_id', referencedColumnName: 'id' },
  })
  users: User[];

  constructor(name: string, permissions: Array<Permission>) {
    this.name = name;
    this.permissions = permissions;
  }
}
