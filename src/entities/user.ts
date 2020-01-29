import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserEntity {
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

  @Column()
  isDeleted: boolean;
}
