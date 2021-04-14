import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  constructor(
    private router: Router,
    private translateService: TranslateService,
    public dialog: MatDialog,
  ) {
    this.translateService.setDefaultLang('en');
  }

  ngOnInit(): void {}

  getLanguage(): string {
    return this.translateService.getDefaultLang().trim();
  }

  setLanguage(data: string): void {

  }

  goToReports(): void{
    this.router.navigate(['/reports'])
  }
}
