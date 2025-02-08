import { Component } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { TodoService } from '../../services/todo.service';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { AddTodoComponent } from '../add-todo/add-todo.component';
import { Observable } from 'rxjs';
import { Todo } from '../../models/todo.interface';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, AsyncPipe, TodoItemComponent, AddTodoComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
})
export class TodoListComponent {
  filterTypes = ['all', 'incomplete', 'completed'] as const;
  todos$: Observable<Todo[]>;
  currentFilter: 'all' | 'incomplete' | 'completed' = 'all';

  constructor(private todoService: TodoService) {
    this.todos$ = this.todoService.getFilteredTodos();
  }

  setFilter(type: 'all' | 'incomplete' | 'completed'): void {
    this.currentFilter = type;
    this.todoService.setFilter(type);
  }

  onToggleComplete(id: number): void {
    this.todoService.toggleTodo(id);
  }

  onDeleteTodo(id: number): void {
    this.todoService.deleteTodo(id);
  }
}
