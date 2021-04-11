import { TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

export class LanguageFactory {

  static createTranslateLoader(routeUrl: string, httpClient: HttpClient) {
    return new TranslateHttpLoader(
      httpClient,
      './assets/i18n/routes/' + routeUrl,
      '.json'
    );
  }

  static createHttpLoader(httpClient: HttpClient) {
    return new TranslateHttpLoader(httpClient);
  }

  static loadComponentTranslationsFromUrl(
    httpClient: HttpClient,
    url: string,
    translateService: TranslateService,
    callback?: any
  ) {
    
    const translationFilePath = `./assets/i18n/routes${url}/${translateService.getDefaultLang()}.json`;

    httpClient.get(translationFilePath).subscribe(
      (data) => {
        translateService.setTranslation(
          translateService.getDefaultLang(),
          data,
          true
        );

        translateService.use(translateService.getDefaultLang());

        if (callback) {
          callback(true);
        }
      },
      (err) => {
        if (callback) {
          callback(false);
        }
      }
    );
  }

  static loadComponentTranslations(
    httpClient: HttpClient,
    router: Router,
    translateService: TranslateService,
    callback?: any
  ) {
    
    const url = router.url;

    // url = url.replace(/\/[a-f0-9]{24}$/, ''); // Enhance this pattern to identify Object ID better

    const translationFilePath = `./assets/i18n/routes${url}/${translateService.getDefaultLang()}.json`;

    httpClient.get(translationFilePath).subscribe(
      (data) => {
        translateService.setTranslation(
          translateService.getDefaultLang(),
          data,
          true
        );

        translateService.use(translateService.getDefaultLang());

        if (callback) {
          callback(true);
        }
      },
      (err) => {
        if (callback) {
          callback(false);
        }
      }
    );
  }
}
