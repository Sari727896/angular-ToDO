import { TestBed } from '@angular/core/testing';
import { TodoService } from './todo.service';
import { Todo } from '../models/todo.interface';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TodoActions } from '../store/todo.actions';
import { selectAllTodos, selectFilteredTodos } from '../store/todo.selectors';
import { FilterType } from '../models/filter-type.enum';

describe('TodoService', () => {
  let service: TodoService;
  let store: MockStore;
  const initialState = {
    todos: {
      todos: [],
      filter: 'all',
    },
  };

  const mockTodos: Todo[] = [
    { id: 1, title: 'Test Todo 1', completed: false },
    { id: 2, title: 'Test Todo 2', completed: true },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TodoService, provideMockStore({ initialState })],
    });

    service = TestBed.inject(TodoService);
    store = TestBed.inject(Store) as MockStore;

    // Set up selector mocks
    store.overrideSelector(selectAllTodos, mockTodos);
    store.overrideSelector(selectFilteredTodos, mockTodos);
  });

  afterEach(() => {
    store?.resetSelectors();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getTodos', () => {
    it('should return todos from store', (done) => {
      service.getTodos().subscribe((todos) => {
        expect(todos).toEqual(mockTodos);
        done();
      });
    });
  });

  describe('getFilteredTodos', () => {
    it('should return filtered todos from store', (done) => {
      service.getFilteredTodos().subscribe((todos) => {
        expect(todos).toEqual(mockTodos);
        done();
      });
    });
  });

  describe('addTodo', () => {
    it('should dispatch addTodo action', () => {
      const spy = jest.spyOn(store, 'dispatch');
      service.addTodo('New Todo', 'Description');

      expect(spy).toHaveBeenCalledWith(
        TodoActions.addTodo({ title: 'New Todo', description: 'Description' })
      );
    });
  });

  describe('toggleTodo', () => {
    it('should dispatch toggleTodo action', () => {
      const spy = jest.spyOn(store, 'dispatch');
      service.toggleTodo(1);

      expect(spy).toHaveBeenCalledWith(TodoActions.toggleTodo({ id: 1 }));
    });
  });

  describe('deleteTodo', () => {
    it('should dispatch deleteTodo action', () => {
      const spy = jest.spyOn(store, 'dispatch');
      service.deleteTodo(1);

      expect(spy).toHaveBeenCalledWith(TodoActions.deleteTodo({ id: 1 }));
    });
  });

  describe('setFilter', () => {
    it('should dispatch setFilter action', () => {
      const spy = jest.spyOn(store, 'dispatch');
      service.setFilter(FilterType.COMPLETED);

      expect(spy).toHaveBeenCalledWith(
        TodoActions.setFilter({ filterType: FilterType.COMPLETED })
      );
    });
  });
});
