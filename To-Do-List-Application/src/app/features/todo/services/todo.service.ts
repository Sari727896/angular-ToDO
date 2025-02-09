import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo.interface';
import { selectAllTodos, selectFilteredTodos } from '../store/todo.selectors';
import { TodoActions } from '../store/todo.actions';
import { FilterType } from '../models/filter-type.enum';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private store: Store) {}

  getTodos(): Observable<Todo[]> {
    return this.store.select(selectAllTodos);
  }

  getFilteredTodos(): Observable<Todo[]> {
    return this.store.select(selectFilteredTodos);
  }

  addTodo(title: string, description?: string): void {
    this.store.dispatch(TodoActions.addTodo({ title, description }));
  }

  toggleTodo(id: number): void {
    this.store.dispatch(TodoActions.toggleTodo({ id }));
  }

  deleteTodo(id: number): void {
    this.store.dispatch(TodoActions.deleteTodo({ id }));
  }

  setFilter(filterType:FilterType): void {
    this.store.dispatch(TodoActions.setFilter({ filterType }));
  }
}
