import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangeRatesListComponent } from './exchange-rates-list.component';

describe('ExchangeRatesListComponent', () => {
  let component: ExchangeRatesListComponent;
  let fixture: ComponentFixture<ExchangeRatesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExchangeRatesListComponent ],
      providers : [ HttpClientModule, HttpClient, HttpHandler ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExchangeRatesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
