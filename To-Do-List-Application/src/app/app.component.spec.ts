import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { By } from '@angular/platform-browser';
import { TranslateModule, TranslateStore, TranslateService } from '@ngx-translate/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { TodoListComponent } from './features/todo/components/todo-list/todo-list.component';
import { TodoService } from './features/todo/services/todo.service';
import { TodoItemComponent } from './features/todo/components/todo-item/todo-item.component';
import { AddTodoComponent } from './features/todo/components/add-todo/add-todo.component';
import { TranslationService } from './features/todo/services/translation.service';
import { FilterType } from './features/todo/models/filter-type.enum';

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
      imports: [
        TodoListComponent, 
        TodoItemComponent, 
        AddTodoComponent,
        TranslateModule.forRoot(),
        NoopAnimationsModule,
        MatButtonToggleModule
      ],
      providers: [
        { provide: TodoService, useValue: todoServiceMock },
        TranslateService,
        TranslateStore,
        TranslationService
      ],
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
    component.setFilter(FilterType.INCOMPLETE);
    expect(todoService.setFilter).toHaveBeenCalledWith(FilterType.INCOMPLETE);
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