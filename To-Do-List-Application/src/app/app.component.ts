import { Component } from '@angular/core';
import { TodoListComponent } from './features/todo/components/todo-list/todo-list.component';

@Component({
  selector: 'app-root',
  imports: [TodoListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
