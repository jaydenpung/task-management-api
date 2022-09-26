import { TaskStatus } from 'src/common/enum/task-status';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Task')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  dueDate: Date;

  @Column()
  createdAt: Date;
}
