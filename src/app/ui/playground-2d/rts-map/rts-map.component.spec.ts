import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RtsMapComponent } from './rts-map.component';

describe('RtsMapComponent', () => {
  let component: RtsMapComponent;
  let fixture: ComponentFixture<RtsMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RtsMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RtsMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
