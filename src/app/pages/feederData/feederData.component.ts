import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { LanguageFactory } from './../../shared/lang/language_factory';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Food } from './../../models/food.model';
import { FoodKind } from './../../models/foodKind.model';
import { Location } from './../../models/location.model';
import { environment } from 'src/environments/environment';
import { ApiResponse } from 'src/app/models/apiresponse.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmationComponent } from 'src/app/shared/dialog-confirmation/dialog-confirmation.component';
import { DialogNewSingleFieldComponent } from 'src/app/shared/dialog-new-single/dialog-new-single.component';
import { DateRange, MatCalendarCellCssClasses } from '@angular/material/datepicker';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiPostResponse } from 'src/app/models/apipostresponse.model';

@Component({
  selector: 'app-feederData',
  templateUrl: './feederData.component.html',
  styleUrls: ['./feederData.component.scss'],
})
export class FeederDataComponent implements OnInit{
  
  selectedFood: number = 0;
  selectedKind: number = 0;
  selectedLocation: number = 0;
  totalDucks = 0;
  totalFood = 0;
  feedTime = "";
  rangedDate?: DateRange<Date>;
  urlLocation = environment.api + "location"
  urlKind = environment.api + "foodkind"
  urlFood = environment.api + "food"
  urlFeederData = environment.api + "feederdatas"
  
  foods: Food[] = [];
  locations: Location[] = [];
  kinds: FoodKind[] = [];

  constructor(
    private translateService: TranslateService,
    private router: Router,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
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
    if(this.rangedDate){
      if(this.rangedDate.end){
        this.rangedDate = new DateRange(evt,null)
      }else if(this.rangedDate.start && this.rangedDate.start < evt){
        this.rangedDate = new DateRange(this.rangedDate.start,evt)
      }else{
        this.rangedDate = new DateRange(evt,this.rangedDate.start)
      }
    }else{
      this.rangedDate = new DateRange(evt,null)
    }
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
      if(result != "false" && result){
        this.httpClient.post<ApiPostResponse>(this.urlFood, { food: result }).subscribe({
            next: d => {
                this.foods.push({idfood:d.data,food:result})
            },
            error: error => {
                console.error('There was an error!', error);
            }
        })
      }
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
      if(result != "false" && result){
        this.httpClient.post<ApiPostResponse>(this.urlKind, { kind: result }).subscribe({
            next: d => {
              this.kinds.push({idkind:d.data,kind:result})
            },
            error: error => {
                console.error('There was an error!', error);
            }
        })
      }
    });
  }

  checkToSave(){
    let res = true;
    if( this.feedTime.length == 0 || 
        this.selectedFood == 0 || 
        this.selectedKind == 0 || 
        this.selectedLocation == 0 ||
        this.totalDucks < 1 ||
        this.totalFood < 1 ||
        !this.rangedDate ||
        !this.rangedDate?.start
        ){
          res = false
    }
    return res
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
      if(result != "false" && result){
        this.httpClient.post<ApiPostResponse>(this.urlLocation, { location: result }).subscribe({
            next: d => {
              this.locations.push({idlocation:d.data,location:result})
            },
            error: error => {
                console.error('There was an error!', error);
            }
        })
      }
    });
  }

  updateTotalDucks(evt:any){
    this.totalDucks = Number(evt.target.value)
  }

  updateTotalFood(evt:any){
    this.totalFood = Number(evt.target.value)
  }

  updateTime(evt:any){
    this.feedTime = evt.target.value
  }

  openSaveConfirmation(){
    if(!this.checkToSave()){
      this.snackBar.open(this.translateService.instant('feeder.missingData'), '', {
        duration: 1500,
        horizontalPosition: "center",
        verticalPosition: "bottom",
      });
      return
    }
    const dialogRef = this.dialog.open(DialogConfirmationComponent, {
      data: {
        title:      this.translateService.instant('feeder.saveTitle'),
        message:    this.translateService.instant('feeder.saveMsg'),
        cancelName: this.translateService.instant('app.cancel'),
        confirmName:this.translateService.instant('app.confirm'),
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        let dates: string[] = [];
        if(!(this.rangedDate?.end)){
          this.rangedDate = new DateRange(this.rangedDate!.start,this.rangedDate!.start)
        }
        
        this.httpClient.post<ApiPostResponse>(this.urlFeederData, { 
                                                                startDate: this.rangedDate!.start?.toISOString().slice(0, 10).replace('T', ' '), 
                                                                endDate: this.rangedDate!.end?.toISOString().slice(0, 10).replace('T', ' '), 
                                                                feedTime: this.feedTime,
                                                                totalDucks:this.totalDucks, 
                                                                quantity: this.totalFood, 
                                                                location: this.selectedLocation, 
                                                                food: this.selectedFood, 
                                                                kind: this.selectedKind 
                                                              }
                                                              ).subscribe({
            next: d => {
                // {error: false, message: "Data added successfully!", data: 7}
                console.log(d)
                this.router.navigate(['/'])
            },
            error: error => {
                console.error('There was an error!', error);
            }
        })
      }
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
        //
      }
    );
  }
}