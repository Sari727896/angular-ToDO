import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslateModule } from '@ngx-translate/core';
import { TranslationService } from '../../services/translation.service';
import { Direction } from '@angular/cdk/bidi';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [CommonModule, MatSelectModule, MatFormFieldModule, TranslateModule],
  templateUrl: './language-switcher.component.html',
  styleUrl: './language-switcher.component.scss',
})
export class LanguageSwitcherComponent {
  languages = [
    { code: 'en', name: 'English', dir: 'ltr' as Direction },
    { code: 'he', name: 'עברית', dir: 'rtl' as Direction },
    { code: 'fr', name: 'Français', dir: 'rtl' as Direction },
  ];

  constructor(public translationService: TranslationService) {}

  onLanguageChange(lang: string): void {
    this.translationService.setLanguage(lang);
    this.updateDocumentDirection(lang);
  }

  private updateDocumentDirection(lang: string): void {
    const selectedLang = this.languages.find((l) => l.code === lang);
    document.documentElement.dir = selectedLang?.dir || 'ltr';
  }
}
