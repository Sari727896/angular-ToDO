import { createReducer, on } from '@ngrx/store';
import { Todo } from '../models/todo.interface';
import { TodoActions } from './todo.actions';

export interface TodoState {
  todos: Todo[];
  filterType: 'all' | 'incomplete' | 'completed';
}

const STORAGE_KEY = 'todos';

const loadInitialState = (): Todo[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const initialState: TodoState = {
  todos: loadInitialState(),
  filterType: 'all',
};

export const todoReducer = createReducer(
  initialState,
  on(TodoActions.addTodo, (state, { title, description }) => {
    const newTodo: Todo = {
      id: Date.now(),
      title,
      description,
      completed: false,
    };
    const newState = {
      ...state,
      todos: [...state.todos, newTodo],
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newState.todos));
    return newState;
  }),
  on(TodoActions.toggleTodo, (state, { id }) => {
    const newTodos = state.todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    const newState = {
      ...state,
      todos: newTodos,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newTodos));
    return newState;
  }),
  on(TodoActions.deleteTodo, (state, { id }) => {
    const newTodos = state.todos.filter((todo) => todo.id !== id);
    const newState = {
      ...state,
      todos: newTodos,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newTodos));
    return newState;
  }),
  on(TodoActions.setFilter, (state, { filterType }) => ({
    ...state,
    filterType,
  }))
);
