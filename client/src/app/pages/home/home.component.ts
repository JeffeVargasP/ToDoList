import { Component } from '@angular/core';
import { AddComponent } from "../add/add.component";
import { TasksComponent } from "../tasks/tasks.component";

@Component({
  selector: 'app-home',
  imports: [AddComponent, TasksComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
