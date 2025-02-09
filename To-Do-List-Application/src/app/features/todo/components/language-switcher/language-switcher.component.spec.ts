import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LanguageSwitcherComponent } from './language-switcher.component';
import {
  TranslateModule,
  TranslateStore,
  TranslateService,
} from '@ngx-translate/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { TranslationService } from '../../services/translation.service';

describe('LanguageSwitcherComponent', () => {
  let component: LanguageSwitcherComponent;
  let fixture: ComponentFixture<LanguageSwitcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LanguageSwitcherComponent,
        TranslateModule.forRoot(),
        NoopAnimationsModule,
        MatSelectModule,
      ],
      providers: [TranslateStore, TranslateService, TranslationService],
    }).compileComponents();

    fixture = TestBed.createComponent(LanguageSwitcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have initial languages array', () => {
    expect(component.languages.length).toBeGreaterThan(0);
  });
});
