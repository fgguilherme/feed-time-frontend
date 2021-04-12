import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { LanguageFactory } from './lang/language_factory';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { LangSelectorComponent } from './lang-selector/lang-selector.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    LangSelectorComponent,
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MatToolbarModule,
    MatDialogModule,
    MatTooltipModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatProgressBarModule,
    FormsModule,
    MatInputModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: LanguageFactory.createHttpLoader,
        deps: [HttpClient],
      },
      isolate: false,
    }),
    RouterModule,
  ],
  exports: [
    TranslateModule,
    MatInputModule,
    MatFormFieldModule,
    HeaderComponent,
    LangSelectorComponent,
  ],
})
export class SharedModule {}
