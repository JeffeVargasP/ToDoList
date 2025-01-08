import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCheck, faTrash, faXmark, faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  faTrash = faTrash;
  faCheck = faCheck;
  faXMark = faXmark;
  faEllipsis = faEllipsis;
  dropdownOpen: number | null = null;
  modalOpen = false;
  index: number | null = null;
  tasks$;
  
  constructor(private taskService: TaskService) {
    this.tasks$ = this.taskService.tasks$;
  }

  toggleStatus(index: number): void {
    this.dropdownOpen = null;
    this.taskService.toggleTaskStatus(index);
  }

  toggleDropdown(index: number): void {
    this.dropdownOpen = this.dropdownOpen === index ? null : index;
  }

  deleteTask(index: number): void {
    this.dropdownOpen = null;
    this.modalOpen = true;
    this.index = index;
  }

  confirmDelete(): void {
    this.dropdownOpen = null;
    this.modalOpen = true;
    this.taskService.deleteTask(this.index as number);
    this.modalOpen = false;
  }

}
