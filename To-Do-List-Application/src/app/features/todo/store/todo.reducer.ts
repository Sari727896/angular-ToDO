import { createReducer, on } from '@ngrx/store';
import { Todo } from '../models/todo.interface';
import { TodoActions } from './todo.actions';
import { FilterType } from '../models/filter-type.enum';

export interface TodoState {
  todos: Todo[];
  filterType: FilterType;
}

const STORAGE_KEY = 'todos';

const loadInitialState = (): Todo[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const initialState: TodoState = {
  todos: loadInitialState(),
  filterType: FilterType.ALL,
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
    const todoToUpdate = state.todos.find((todo) => todo.id === id);

    if (!todoToUpdate) {
      return state;
    }
    const todoIndex = state.todos.findIndex((todo) => todo.id === id);
    const updatedTodo = { ...todoToUpdate, completed: !todoToUpdate.completed };
    const newTodos = [
      ...state.todos.slice(0, todoIndex),
      updatedTodo,
      ...state.todos.slice(todoIndex + 1),
    ];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newTodos));
    return {
      ...state,
      todos: newTodos,
    };
  }),

  on(TodoActions.deleteTodo, (state, { id }) => {
    const todoIndex = state.todos.findIndex((todo) => todo.id === id);
    if (todoIndex === -1) {
      return state;
    }
    const newTodos = [
      ...state.todos.slice(0, todoIndex),
      ...state.todos.slice(todoIndex + 1),
    ];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newTodos));
    return {
      ...state,
      todos: newTodos,
    };
  }),

  on(TodoActions.setFilter, (state, { filterType }) => ({
    ...state,
    filterType,
  }))
);
