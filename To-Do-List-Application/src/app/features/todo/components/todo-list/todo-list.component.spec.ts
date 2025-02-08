import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoListComponent } from './todo-list.component';
import { TodoService } from '../../services/todo.service';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { AddTodoComponent } from '../add-todo/add-todo.component';
import { BehaviorSubject } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let todoService: TodoService;
  const mockTodos$ = new BehaviorSubject([
    { id: 1, title: 'Test Todo 1', completed: false },
    { id: 2, title: 'Test Todo 2', completed: true },
  ]);

  beforeEach(async () => {
    const todoServiceMock = {
      getFilteredTodos: jest.fn().mockReturnValue(mockTodos$),
      setFilter: jest.fn(),
      toggleTodo: jest.fn(),
      deleteTodo: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [TodoListComponent, TodoItemComponent, AddTodoComponent],
      providers: [{ provide: TodoService, useValue: todoServiceMock }],
    }).compileComponents();

    todoService = TestBed.inject(TodoService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display todos', () => {
    const todoElements = fixture.debugElement.queryAll(By.css('app-todo-item'));
    expect(todoElements.length).toBe(2);
  });

  it('should call setFilter with correct type', () => {
    const filterButtons = fixture.debugElement.queryAll(By.css('.filter-btn'));
    filterButtons[1].nativeElement.click();
    expect(todoService.setFilter).toHaveBeenCalledWith('incomplete');
  });

  it('should handle todo completion toggle', () => {
    component.onToggleComplete(1);
    expect(todoService.toggleTodo).toHaveBeenCalledWith(1);
  });

  it('should handle todo deletion', () => {
    component.onDeleteTodo(1);
    expect(todoService.deleteTodo).toHaveBeenCalledWith(1);
  });
});
