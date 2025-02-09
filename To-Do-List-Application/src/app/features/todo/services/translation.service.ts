import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private currentLang = new BehaviorSubject<string>('en');
  currentLang$ = this.currentLang.asObservable();

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('en');

    const browserLang =
      localStorage.getItem('preferredLanguage') ||
      translate.getBrowserLang() ||
      'en';

    this.setLanguage(browserLang);
    this.updateDocumentDirection(browserLang);
  }

  setLanguage(lang: string): void {
    localStorage.setItem('preferredLanguage', lang);
    this.translate.use(lang);
    this.currentLang.next(lang);
    this.updateDocumentDirection(lang);
  }

  private updateDocumentDirection(lang: string): void {
    document.documentElement.dir = lang === 'he' ? 'rtl' : 'ltr';
  }

  instant(key: string, params?: Object): string {
    return this.translate.instant(key, params);
  }
}
