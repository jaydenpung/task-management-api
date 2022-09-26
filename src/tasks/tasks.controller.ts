import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { IdParameterDTO } from 'src/common/dto/id-parameter.dto';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { TaskDTO } from './dto/task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(@Body() createTasksDto: CreateTaskDto) {
    const tasks = await this.tasksService.create(createTasksDto);
    return TaskDTO.mutate(tasks);
  }

  @Get()
  async findAll() {
    const result = await this.tasksService.findAll();
    return (result as Task[]).map<TaskDTO>(TaskDTO.mutate);
  }

  @Get(':id')
  async findOne(@Param() { id }: IdParameterDTO) {
    return await this.tasksService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param() { id }: IdParameterDTO,
    @Body() updateTasksDto: UpdateTaskDto,
  ) {
    const tasks = await this.tasksService.update(id, updateTasksDto);
    return TaskDTO.mutate(tasks);
  }

  @Delete(':id')
  async remove(@Param() { id }: IdParameterDTO) {
    return this.tasksService.remove(id);
  }
}
