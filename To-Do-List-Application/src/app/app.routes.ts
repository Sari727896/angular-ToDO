import { Routes } from '@angular/router';
import { TodoListComponent } from './features/todo/components/todo-list/todo-list.component';
import { AddTodoComponent } from './features/todo/components/add-todo/add-todo.component';

export const routes: Routes = [
  { path: '', redirectTo: 'todos', pathMatch: 'full' },
  { path: 'todos', component: TodoListComponent, title: 'Todo List' },
  { path: 'todos/new', component: AddTodoComponent, title: 'Add New Todo' },
  { path: '**', redirectTo: 'todos' },
];
