import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideMockStore } from '@ngrx/store/testing';
import { TodoListComponent } from './features/todo/components/todo-list/todo-list.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, TodoListComponent, NoopAnimationsModule],
      providers: [
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

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render todo-list component', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('app-todo-list')).toBeTruthy();
  });
});
