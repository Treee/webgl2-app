import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeoWars2dComponent } from './geo-wars-2d.component';

describe('GeoWars2dComponent', () => {
  let component: GeoWars2dComponent;
  let fixture: ComponentFixture<GeoWars2dComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeoWars2dComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeoWars2dComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
