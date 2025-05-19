import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { TaskDto } from './task.dto';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  findAll() {
    return this.taskService.findAll();
  }

  @Get('/:id')
  findById(@Param('id') id: string) {
    return this.taskService.findById(id);
  }

  @Post()
  create(@Body() task: TaskDto) {
    return this.taskService.create(task);
  }

  @Put()
  update(@Body() task: TaskDto) {
    return this.taskService.update(task);
  }
}
