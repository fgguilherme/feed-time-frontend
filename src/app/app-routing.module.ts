import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeederDataComponent } from './pages/feederData/feederData.component';
import { ReportsComponent } from './pages/reports/reports.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'feeder',
    pathMatch: 'prefix',
  },
  {
    path: 'feeder',
    component: FeederDataComponent,
  },
  {
    path: 'reports',
    component: ReportsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
