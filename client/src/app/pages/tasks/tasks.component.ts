import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../task.service';
import { CommonModule } from '@angular/common';

interface Task {
  id: number;
  description: string;
  done: boolean;
}

@Component({
  selector: 'app-tasks',
  imports: [CommonModule],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  selectedFilter: string = 'todas';

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe(
      (data: Task[]) => {
        this.tasks = data;
        this.filterTasks(this.selectedFilter);
      },
      (error) => {
        console.error('Erro ao carregar tarefas:', error);
      }
    );
  }

  filterTasks(filter: string): void {
    this.selectedFilter = filter;
    if (filter === 'concluidas') {
      this.filteredTasks = this.tasks.filter((task) => task.done);
    } else {
      this.filteredTasks = this.tasks;
    }
  }

  updateTaskStatus(id: number, done: boolean): void {
    const updatedTask = this.tasks.find((task) => task.id === id);
    if (updatedTask) {
      updatedTask.done = done;
      this.taskService.updateTask(id, updatedTask).subscribe(
        () => {
          this.filterTasks(this.selectedFilter);
        },
        (error) => {
          console.error('Erro ao atualizar tarefa:', error);
        }
      );
    }
  }
}