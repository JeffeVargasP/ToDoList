import { Component } from '@angular/core';
import { ListComponent } from "./list/list.component";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [ListComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'To-Do List';
  tasks: { task: string | null; status: boolean }[] = [];
  taskForm = new FormGroup({
    task: new FormControl('', [Validators.required, Validators.minLength(3)])
  });

  constructor(private fb: FormBuilder) { 
    const storedTasks = localStorage.getItem('tasks');
    this.tasks = storedTasks ? JSON.parse(storedTasks) : [];
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const formValue = this.taskForm.getRawValue();

      const newTask = { task: formValue.task, status: false };
      this.tasks.push(newTask);

      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    
      this.taskForm.reset();

      location.reload();
    }
  }

}
