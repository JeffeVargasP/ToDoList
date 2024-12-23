import { Component } from '@angular/core';
import { TaskService } from '../../task.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-add',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss'
})
export class AddComponent {

  addTask!: FormGroup;

  constructor(private taskService: TaskService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.addTask = this.fb.group({
      description: ['', Validators.required]
    });
  }

  createTask(): void {
    if (this.addTask.valid) {
      const taskData = this.addTask.value;
      this.taskService.createTask(taskData).subscribe(
        (data) => {
          this.addTask.reset();
          location.reload();
        },
        (error) => {
        }
      );
    } else {
    }
  }

}
