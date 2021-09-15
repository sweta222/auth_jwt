import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailDetailComponent } from './detail-detail.component';

describe('DetailDetailComponent', () => {
  let component: DetailDetailComponent;
  let fixture: ComponentFixture<DetailDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
