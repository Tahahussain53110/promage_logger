import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Project } from './project.entity';
import { ProjectManager } from './project-manager.entity';
import { TaskStatusType } from '../utils/types';

@Entity()
export class Task {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false })
  startDate: string;

  @Column({ nullable: false })
  endDate: string;

  @Column(
    { type: 'enum',
      enum: ['completed', 'started', 'not-started', 'rejected'], default: 'not-started',
    },
  )
  status: TaskStatusType;


  @ManyToOne(() => Project, (project) => project.tasks, { nullable: false })
  project: Project;

  @ManyToOne(() => ProjectManager, (projectManager) => projectManager.tasks, { nullable: false })
  projectManager: ProjectManager;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
