import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { LanguageFactory } from './../../shared/lang/language_factory';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiResponse } from 'src/app/models/apiresponse.model';
import { FeederData } from 'src/app/models/feederData.model';
import { environment } from 'src/environments/environment';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FileSaverService } from 'ngx-filesaver';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent implements AfterViewInit, OnInit {
  
  dataFeed! : MatTableDataSource<FeederData>;
  dataFeedArr: FeederData[] = []
  displayedColumns: string[] = ['feedTime', 'totalDucks', 'quantity', 'food', 'kind', 'location'];
  urlFeedData: string = environment.api + "feederdata";
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(
    private translateService: TranslateService,
    private router: Router,
    private _FileSaverService: FileSaverService,
    private httpClient: HttpClient,
  ) {
    this.loadTranslations()
  }
  ngAfterViewInit(): void {
  }

  ngOnInit(){
    this.translateService.onLangChange.subscribe(() => {
      this.loadTranslations();
    });
    this.loadData()
  }

  exportData(){
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';
    const ws = XLSX.utils.json_to_sheet(this.dataFeed.data);
    const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], {type: fileType});
    this._FileSaverService.save(data, "report_"+(new Date()).toISOString().split("T")[0]+ fileExtension);
  }

  loadData(){
    this.httpClient.get<any>(this.urlFeedData, {
      params: new HttpParams()
          .set('pn', 2)
          .set('size', 30)
  })
    .subscribe(data => {
      console.log(data)
      this.dataFeed = new MatTableDataSource(data.data);
      this.dataFeed.paginator = this.paginator;
      this.dataFeed.sort = this.sort;
    });
  }

  applyFilter(evt: any) {
    let filterValue = evt.target.value
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataFeed.filter = filterValue;
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
