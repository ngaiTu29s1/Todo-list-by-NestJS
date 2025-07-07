import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './task.model';
import { TaskStatus } from './task-status.enum';
import { v4 as uuid } from 'uuid'; // Import hàm v4 từ thư viện uuid
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  // Tạm thời lưu trữ tasks trong một mảng (thay cho database)
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task {
    const found = this.tasks.find(task => task.id === id);
    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return found;
  }
  
  // Hàm này chúng ta sẽ viết
  createTask(createTaskDto: CreateTaskDto): Task {
    // Lấy title và description từ DTO
    const { title, description } = createTaskDto;

    // Tạo một đối tượng task hoàn chỉnh
    const task: Task = {
      id: uuid(), // Gán một ID duy nhất
      title,
      description,
      status: TaskStatus.OPEN, // Gán trạng thái mặc định
    };

    // Thêm task mới vào mảng tasks
    this.tasks.push(task);

    // Trả về task vừa tạo để controller có thể gửi lại cho client
    return task;
  }

  deleteTask(id: string): void {
    const found = this.getTaskById(id);
    this.tasks = this.tasks.filter(task => task.id !== found.id);
  }

  updateTaskStatus(id: string, status: TaskStatus): Task {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }
  
  // Các hàm khác sẽ được thêm sau...
}
