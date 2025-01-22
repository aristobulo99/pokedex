import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadarSkipPointsComponent } from './radar-skip-points.component';

describe('RadarSkipPointsComponent', () => {
  let component: RadarSkipPointsComponent;
  let fixture: ComponentFixture<RadarSkipPointsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RadarSkipPointsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RadarSkipPointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
