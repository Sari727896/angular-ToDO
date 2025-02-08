import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TodoState } from './todo.reducer';

export const selectTodoState = createFeatureSelector<TodoState>('todo');

export const selectAllTodos = createSelector(
  selectTodoState,
  (state) => state.todos
);

export const selectFilterType = createSelector(
  selectTodoState,
  (state) => state.filterType
);

export const selectFilteredTodos = createSelector(
  selectAllTodos,
  selectFilterType,
  (todos, filterType) => {
    switch (filterType) {
      case 'incomplete':
        return todos.filter((todo) => !todo.completed);
      case 'completed':
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  }
);
