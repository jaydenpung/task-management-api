import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { IdParameterDTO } from 'src/common/dto/id-parameter.dto';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { TaskDTO } from './dto/task.dto';
import { TaskQueryParameterDTO } from './dto/task-query-parameter.dto';
import { TaskQueryParameter } from './query-parameter/task-query-parameter';
import { Pagination } from 'src/common/pagination/pagination';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(@Body() createTasksDto: CreateTaskDto) {
    const tasks = await this.tasksService.create(createTasksDto);
    return TaskDTO.mutate(tasks);
  }

  @Get()
  async findAll(@Query() queryParameters: TaskQueryParameterDTO) {
    const queryFilter = new TaskQueryParameter(queryParameters);

    const result = await this.tasksService.findAll(queryFilter);
    if (queryFilter.hasPaginationMeta()) {
      return result as Pagination;
    }

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
