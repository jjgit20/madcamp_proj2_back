import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("tb_users")
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  image: string;
}
