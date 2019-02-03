import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Playground3dComponent } from './playground-3d.component';

describe('Playground-3dComponent', () => {
  let component: Playground3dComponent;
  let fixture: ComponentFixture<Playground3dComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [Playground3dComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Playground3dComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
