import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddTodoComponent } from './add-todo.component';
import { TodoService } from '../../services/todo.service';
import { provideMockStore } from '@ngrx/store/testing';
import { ReactiveFormsModule } from '@angular/forms';

describe('AddTodoComponent', () => {
  let component: AddTodoComponent;
  let fixture: ComponentFixture<AddTodoComponent>;
  let todoService: TodoService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTodoComponent, ReactiveFormsModule],
      providers: [
        TodoService,
        provideMockStore({
          initialState: {
            todos: {
              todos: [],
              filter: 'all',
            },
          },
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddTodoComponent);
    component = fixture.componentInstance;
    todoService = TestBed.inject(TodoService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty form', () => {
    expect(component.todoForm.get('title')?.value).toBe('');
    expect(component.todoForm.get('description')?.value).toBe('');
  });

  it('should validate required title', () => {
    const titleControl = component.todoForm.get('title');
    expect(titleControl?.valid).toBeFalsy();
    expect(titleControl?.errors?.['required']).toBeTruthy();
  });

  it('should validate minimum length of title', () => {
    const titleControl = component.todoForm.get('title');
    titleControl?.setValue('ab');
    expect(titleControl?.errors?.['minlength']).toBeTruthy();

    titleControl?.setValue('abc');
    expect(titleControl?.errors?.['minlength']).toBeFalsy();
  });

  it('should call todoService.addTodo when form is valid', () => {
    const addTodoSpy = jest.spyOn(todoService, 'addTodo');

    component.todoForm.setValue({
      title: 'Test Todo',
      description: 'Test Description',
    });

    component.onSubmit();

    expect(addTodoSpy).toHaveBeenCalledWith('Test Todo', 'Test Description');
  });

  it('should not call todoService.addTodo when form is invalid', () => {
    const addTodoSpy = jest.spyOn(todoService, 'addTodo');

    component.todoForm.setValue({
      title: '',
      description: 'Test Description',
    });

    component.onSubmit();

    expect(addTodoSpy).not.toHaveBeenCalled();
  });

  it('should reset form after successful submission', () => {
    component.todoForm.setValue({
      title: 'Test Todo',
      description: 'Test Description',
    });

    component.onSubmit();

    expect(component.todoForm.get('title')?.value).toBeNull();
    expect(component.todoForm.get('description')?.value).toBeNull();
  });
});
