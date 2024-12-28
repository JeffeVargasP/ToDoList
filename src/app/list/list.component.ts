import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCheck, faTrash, faXmark } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-list',
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {

  tasks: { task: string, status: boolean }[] = [];
  faTrash = faTrash;
  faCheck = faCheck;
  faXMark = faXmark;

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    const storedTasks = localStorage.getItem('tasks');
    this.tasks = storedTasks ? JSON.parse(storedTasks) : [];
  }

  toggleStatus(index: number): void {
    this.tasks[index].status = !this.tasks[index].status;
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  deleteTask(index: number): void {
    this.tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  saveTask(task: string): void {
    this.tasks.push({ task, status: false });
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

}
