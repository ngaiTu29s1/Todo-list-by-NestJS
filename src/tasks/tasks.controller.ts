import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'; // Thêm các decorator
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './task.model';
import { TaskStatus } from './task-status.enum';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks();
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id);
  }
  
  // ĐÂY LÀ PHƯƠNG THỨC MỚI
  @Post() // Decorator để xử lý phương thức POST
  // @Body() sẽ lấy toàn bộ request body
  // NestJS sẽ dùng CreateTaskDto để validate body đó
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    // Gọi đến service để thực hiện logic và trả về kết quả
    return this.tasksService.createTask(createTaskDto);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): void {
    return this.tasksService.deleteTask(id);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  ): Task {
    const { status } = updateTaskStatusDto;
    return this.tasksService.updateTaskStatus(id, status);
  }
}