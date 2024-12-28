import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Task {
  task: string;
  status: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasksSubject = new BehaviorSubject<Task[]>(
    (() => {
      try {
        return JSON.parse(localStorage.getItem('tasks') || '[]')
      } catch (e) {
        return [];
      }
    })()
  );

  tasks$ = this.tasksSubject.asObservable();

  addTask(task: string): void {
    if (!task.trim()) return;
    const tasks = this.tasksSubject.value;
    if (tasks.some((t) => t.task === task)) return;
    const updatedTasks = [...this.tasksSubject.value, { task, status: false }];
    this.updateTasks(updatedTasks);
  }

  reloadTasks(): void {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    this.tasksSubject.next(storedTasks);
  }

  toggleTaskStatus(index: number): void {
    const tasks = this.tasksSubject.value.map((t, i) =>
      i === index ? { ...t, status: !t.status } : t
    );
    this.updateTasks(tasks);
  }

  deleteTask(index: number): void {
    const updatedTasks = this.tasksSubject.value.filter((_, i) => i !== index);
    this.updateTasks(updatedTasks);
  }

  private updateTasks(tasks: {task: string; status: boolean}[]): void {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    this.tasksSubject.next(tasks);
  }
}
