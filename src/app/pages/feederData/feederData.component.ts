import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { LanguageFactory } from './../../shared/lang/language_factory';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { DateRange } from '@angular/material/datepicker';
import { Food } from './../../models/food.model';
import { FoodKind } from './../../models/foodKind.model';
import { Location } from './../../models/location.model';
import { environment } from 'src/environments/environment';
import { map, catchError, tap } from 'rxjs/operators';
import { ApiResponse } from 'src/app/models/apiresponse.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmationComponent } from 'src/app/shared/dialog-confirmation/dialog-confirmation.component';
import { DialogNewSingleFieldComponent } from 'src/app/shared/dialog-new-single/dialog-new-single.component';

@Component({
  selector: 'app-feederData',
  templateUrl: './feederData.component.html',
  styleUrls: ['./feederData.component.scss'],
})
export class FeederDataComponent implements OnInit{
  
  selectedValue: string = 'steak-0';
  selectedDate: Date = new Date();
  urlLocation = environment.api + "location"
  urlKind = environment.api + "foodkind"
  urlFood = environment.api + "food"
  urlFeederData = environment.api + "farmerdata"
  
  foods: Food[] = [];
  locations: Location[] = [];
  kinds: FoodKind[] = [];

  constructor(
    private translateService: TranslateService,
    private router: Router,
    public dialog: MatDialog,
    private httpClient: HttpClient,
  ) {
    this.loadTranslations() 
    this.httpClient.get<ApiResponse>(this.urlFood)
    .subscribe(data => {
      this.foods = data.data
    });
    this.httpClient.get<ApiResponse>(this.urlKind)
    .subscribe(data => {
      this.kinds = data.data
    });
    this.httpClient.get<ApiResponse>(this.urlLocation)
    .subscribe(data => {
      this.locations = data.data
    });
  }

  onDateSelect(evt: any){
    console.log(evt)
    this.selectedDate = evt;
  }

  openAddFood(){
    const dialogRef = this.dialog.open(DialogNewSingleFieldComponent, {
      data: {
        title:      this.translateService.instant('feeder.new-food'),
        inputText:  this.translateService.instant('feeder.food'),
        cancelName: this.translateService.instant('app.cancel'),
        confirmName:this.translateService.instant('app.confirm'),
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  
  openAddKind(){
    const dialogRef = this.dialog.open(DialogNewSingleFieldComponent, {
      data: {
        title:      this.translateService.instant('feeder.new-kind'),
        inputText:  this.translateService.instant('feeder.kind'),
        cancelName: this.translateService.instant('app.cancel'),
        confirmName:this.translateService.instant('app.confirm'),
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openAddLocation(){
    const dialogRef = this.dialog.open(DialogNewSingleFieldComponent, {
      data: {
        title:      this.translateService.instant('feeder.new-location'),
        inputText:  this.translateService.instant('feeder.location'),
        cancelName: this.translateService.instant('app.cancel'),
        confirmName:this.translateService.instant('app.confirm'),
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openSaveConfirmation(){
    const dialogRef = this.dialog.open(DialogConfirmationComponent, {
      data: {
        title:      this.translateService.instant('feeder.saveTitle'),
        message:    this.translateService.instant('feeder.saveMsg'),
        cancelName: this.translateService.instant('app.cancel'),
        confirmName:this.translateService.instant('app.confirm'),
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
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