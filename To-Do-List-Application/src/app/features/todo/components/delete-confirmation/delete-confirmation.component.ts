import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  dialogEntrance,
  contentAnimation,
  buttonsAnimation,
  shakeAnimation,
} from '../../animations/dialog.animations';
import { TranslateModule } from '@ngx-translate/core';

interface DialogData {
  todoTitle: string;
}

@Component({
  selector: 'app-delete-confirmation',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule,TranslateModule
  ],
  templateUrl: './delete-confirmation.component.html',
  styleUrl: './delete-confirmation.component.scss',
  animations: [
    dialogEntrance,
    contentAnimation,
    buttonsAnimation,
    shakeAnimation,
  ],
})
export class DeleteConfirmationComponent {
  isShaking = false;

  constructor(
    public dialogRef: MatDialogRef<DeleteConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onCancel(): void {
    this.dialogRef.close(false);
  }
  onConfirm(): void {
    this.isShaking = true;
    setTimeout(() => {
      this.dialogRef.close(true);
    }, 400);
  }
}
