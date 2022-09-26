import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskDTO } from './dto/task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ViewTaskDTO } from './dto/view-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    return await this.taskRepository.save({
      ...createTaskDto,
      createdAt: new Date(),
    });
  }

  async findAll(): Promise<Task[]> {
    return await this.taskRepository.find();
  }

  async findOne(id: number): Promise<ViewTaskDTO> {
    const task = await this.taskRepository.findOneBy({ id });

    if (!task) {
      throw new NotFoundException();
    }

    return {
      ...TaskDTO.mutate(task),
      description: task.description,
    } as ViewTaskDTO;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.taskRepository.findOneBy({ id: id });

    if (!task) {
      throw new NotFoundException();
    }

    return await this.taskRepository.save({
      id: task.id,
      name: updateTaskDto.name ?? task.name,
      description: updateTaskDto.description ?? task.description,
      dueDate: updateTaskDto.dueDate ?? task.dueDate,
    });
  }

  async remove(id: number): Promise<Task> {
    const task = await this.taskRepository.findOneBy({ id });

    if (!task) {
      throw new NotFoundException();
    }

    return await this.taskRepository.remove(task);
  }
}
