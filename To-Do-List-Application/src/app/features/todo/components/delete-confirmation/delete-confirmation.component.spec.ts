import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeleteConfirmationComponent } from './delete-confirmation.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import {
  TranslateModule,
  TranslateService,
  TranslateStore,
} from '@ngx-translate/core';

describe('DeleteConfirmationComponent', () => {
  let component: DeleteConfirmationComponent;
  let fixture: ComponentFixture<DeleteConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DeleteConfirmationComponent,
        NoopAnimationsModule,
        MatDialogModule,
        TranslateModule.forRoot(),
      ],
      providers: [
        TranslateStore,
        TranslateService,
        { provide: MatDialogRef, useValue: { close: jest.fn() } },
        { provide: MAT_DIALOG_DATA, useValue: { todoTitle: 'Test Todo' } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
