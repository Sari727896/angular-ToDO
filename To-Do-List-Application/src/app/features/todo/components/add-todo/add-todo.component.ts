import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-add-todo',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-todo.component.html',
  styleUrl: './add-todo.component.css',
})
export class AddTodoComponent {
  todoForm: FormGroup;

  constructor(private fb: FormBuilder, private todoService: TodoService) {
    this.todoForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
    });
  }

  onSubmit(): void {
    if (this.todoForm.valid) {
      const { title, description } = this.todoForm.value;
      this.todoService.addTodo(title, description);
      this.todoForm.reset();
    }
  }
}
