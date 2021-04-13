import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { LanguageFactory } from './../../shared/lang/language_factory';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { DateRange } from '@angular/material/datepicker';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-feederData',
  templateUrl: './feederData.component.html',
  styleUrls: ['./feederData.component.scss'],
})
export class FeederDataComponent implements OnInit{
  
  selectedValue: string = 'steak-0';
  selectedDate: Date = new Date();
  
  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];

  constructor(
    private translateService: TranslateService,
    private router: Router,
    private httpClient: HttpClient,
  ) {
    this.loadTranslations()
  }

  onDateSelect(evt: any){
    console.log(evt)
    this.selectedDate = evt;
  }

  ngOnInit(){
    this.translateService.onLangChange.subscribe(() => {
      this.loadTranslations();
    });
  }

  loadTranslations() {
    const url = this.router.url;
    LanguageFactory.loadComponentTranslationsFromUrl(
      this.httpClient,
      url,
      this.translateService,
      () => {
        
      }
    );
  }
}