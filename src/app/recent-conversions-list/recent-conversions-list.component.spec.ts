import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';

import { RecentConversionsListComponent } from './recent-conversions-list.component';

describe('RecentConversionsListComponent', () => {
  let component: RecentConversionsListComponent;
  let fixture: ComponentFixture<RecentConversionsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecentConversionsListComponent ],
      imports : [ MatCardModule, MatTableModule],
      providers : [ HttpClientModule, HttpClient ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentConversionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
