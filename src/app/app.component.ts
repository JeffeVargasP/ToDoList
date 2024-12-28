import { Component } from '@angular/core';
import { ListComponent } from "./list/list.component";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TaskService } from './task.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ListComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'To-Do List';
  taskForm = new FormGroup({
    task: new FormControl('', [Validators.required, Validators.minLength(3)])
  });
  tasks$;

  constructor(private fb: FormBuilder, private taskService: TaskService) {
    this.tasks$ = this.taskService.tasks$;
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const task = this.taskForm.value.task || '';
      this.taskService.addTask(task);
      this.taskForm.reset();
    }
  }

  updateTasksInStorage(): void {
    localStorage.setItem('tasks', JSON.stringify(this.tasks$));
  }
}
