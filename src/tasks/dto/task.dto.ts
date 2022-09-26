import { TaskStatus } from 'src/common/enum/task-status';
import { Task } from '../entities/task.entity';
import { DateTime } from 'luxon';

export class TaskDTO {
  id: number;
  name: string;
  description: string;
  status: TaskStatus;
  dueDate: Date;
  createdAt: Date;

  static mutate(task: Task): TaskDTO {
    const dto = new TaskDTO();
    dto.id = task.id;
    dto.name = task.name || null;
    dto.description = task.description || null;
    dto.status = TaskDTO.getStatus(task.dueDate);
    dto.dueDate = task.dueDate || null;
    dto.createdAt = task.createdAt || null;

    return dto;
  }

  static getStatus(dueDate: Date): TaskStatus {
    const DUE_DATE = DateTime.fromISO(dueDate.toISOString());
    const DATE_DUE_SOON = DateTime.fromISO(dueDate.toISOString()).minus({
      days: 7,
    });
    if (DateTime.now() >= DATE_DUE_SOON && DateTime.now() < DUE_DATE) {
      return TaskStatus.DUE_SOON;
    } else if (DateTime.now() < DATE_DUE_SOON) {
      return TaskStatus.NOT_URGENT;
    } else {
      return TaskStatus.OVERDUE;
    }
  }
}
