import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  @IsNotEmpty()
  @IsEmail()
  @Index({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  avatar?: string;

  @Column()
  name: string;
}
