import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../../models/todo.interface';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-todo-item',
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.css',
})
export class TodoItemComponent {
  @Input() todo!: Todo;
  @Output() toggleComplete = new EventEmitter<number>();
  @Output() deleteTodo = new EventEmitter<number>();
  private completeSound = new Audio('assets/sounds/complete.mp3');

  constructor(private dialog: MatDialog) {}

  onToggle(): void {
    if (!this.todo.completed) {
      this.completeSound.play();
    }
    this.toggleComplete.emit(this.todo.id);
  }

  onDelete(): void {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      data: { todoTitle: this.todo.title },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteTodo.emit(this.todo.id);
      }
    });
  }
}
