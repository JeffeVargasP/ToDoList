import { Component } from '@angular/core';
import { ListComponent } from "./list/list.component";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [ListComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'To-Do List';
  tasks = [];
  taskForm = new FormGroup({
    task: new FormControl('', [Validators.required, Validators.minLength(3)])
  });

  constructor(private fb: FormBuilder, private router: Router) { }

  onSubmit() {
    if (this.taskForm.valid) {
      let formValue = this.taskForm.getRawValue();
      localStorage.setItem('tasks', JSON.stringify([...this.tasks, { task: formValue.task, status: false }]));
      location.reload();
    }
  }

}
