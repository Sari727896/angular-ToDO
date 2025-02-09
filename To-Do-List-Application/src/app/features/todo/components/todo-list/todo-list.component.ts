import { Component } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { TodoService } from '../../services/todo.service';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { AddTodoComponent } from '../add-todo/add-todo.component';
import { Observable } from 'rxjs';
import { Todo } from '../../models/todo.interface';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { FilterType } from '../../models/filter-type.enum';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageSwitcherComponent } from '../language-switcher/language-switcher.component';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [
    CommonModule,
    AsyncPipe,
    TodoItemComponent,
    MatButtonToggleModule,
    TranslateModule,
    MatCardModule,
    RouterModule,
    MatIconModule,
  ],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
})
export class TodoListComponent {
  filterTypes = [FilterType.ALL, FilterType.INCOMPLETE, FilterType.COMPLETED];
  todos$: Observable<Todo[]>;
  currentFilter: FilterType = FilterType.ALL;

  constructor(private todoService: TodoService) {
    this.todos$ = this.todoService.getFilteredTodos();
  }

  setFilter(type: FilterType): void {
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
