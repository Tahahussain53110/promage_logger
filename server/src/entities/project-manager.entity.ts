import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Task } from './task.entity';
import { Project } from './project.entity';

@Entity()
export class ProjectManager {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  age: number;

  @Column({ nullable: false })
  email: string;

  @OneToMany(() => Task, (task) => task.projectManager)
  tasks: Task[];

  @ManyToMany(() => Project, (project) => project.projectManagers)
  projects: Project[];

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
