import {Entity, Column, PrimaryGeneratedColumn, Unique} from 'typeorm';

@Entity('tb_users')
@Unique(['username', 'kakaoId'])
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column()
  username: string;

  @Column({nullable: true})
  kakaoId: string;

  @Column()
  password: string;

  @Column()
  nickname: string;

  // @Column()
  // phone: string;

  @Column()
  email: string;

  @Column()
  image: string;
}
