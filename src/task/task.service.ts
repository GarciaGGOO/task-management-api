import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FindAllParameters, TaskDto, TaskStatus } from './task.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TaskService {
  private tasks: TaskDto[] = [];

  findById(id: string): TaskDto {
    // console.log(this.tasks);
    const foundTask = this.tasks.filter((t) => String(t.id) === id);
    if (foundTask.length) {
      return foundTask[0];
    }

    throw new HttpException(
      `Task with id ${id} not found`,
      HttpStatus.NOT_FOUND,
    );
  }

  findAll(params: FindAllParameters): TaskDto[] {
    return this.tasks.filter((t) => {
      let match = true;

      if (params.title != undefined && !t.title.includes(params.title)) {
        match = false;
      }

      if (params.status != undefined && !t.status.includes(params.status)) {
        match = false;
      }

      return match;
    });
  }

  create(task: TaskDto) {
    task.id = uuidv4();
    task.status = TaskStatus.TO_DO;
    this.tasks.push(task);
    // console.log(this.tasks);
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

  delete(id: string) {
    const taskIndex = this.tasks.findIndex((t) => String(t.id) === id);
    if (taskIndex >= 0) {
      this.tasks.splice(taskIndex, 1);
      return true;
    }

    throw new HttpException(
      `Task with id ${id} not found`,
      HttpStatus.BAD_REQUEST,
    );
  }
}
