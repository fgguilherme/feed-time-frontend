import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FeederDataComponent } from './feederData.component';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('EsdTestComponent', () => {
  let component: FeederDataComponent;
  let fixture: ComponentFixture<FeederDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FeederDataComponent],
      imports: [
        RouterTestingModule.withRoutes([]),
        TranslateModule.forRoot(),
        HttpClientTestingModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeederDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
