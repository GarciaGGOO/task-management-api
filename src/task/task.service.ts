import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TaskDto } from './task.dto';

@Injectable()
export class TaskService {
  private tasks: TaskDto[] = [];

  findAll() {
    return this.tasks;
  }

  findById(id: string): TaskDto {
    console.log(this.tasks);
    const foundTask = this.tasks.filter((task) => String(task.id) === id);
    if (foundTask.length) {
      return foundTask[0];
    }

    throw new HttpException(
      `Task with id ${id} not found`,
      HttpStatus.NOT_FOUND,
    );
  }

  create(task: TaskDto) {
    this.tasks.push(task);
    console.log(this.tasks);
    return task;
  }

  update(task: TaskDto) {
    const taskIndex = this.tasks.findIndex((t) => t.id === task.id);

    if (taskIndex >= 0) {
      this.tasks[taskIndex] = task;
      return task;
    }

    throw new HttpException(
      `Task with id ${task.id} not found`,
      HttpStatus.NOT_FOUND,
    );
  }
}
