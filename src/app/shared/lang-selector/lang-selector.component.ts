import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-lang-selector',
  templateUrl: './lang-selector.component.html',
  styleUrls: ['./lang-selector.component.scss'],
})
export class LangSelectorComponent{
  constructor(
    private translateService: TranslateService
  ) {}

  getLanguage(): string {
    return this.translateService.getDefaultLang().trim();
  }

  setLanguage(data: string): void {
    this.translateService.setDefaultLang(data);
    this.translateService.use(data);
  }
}
