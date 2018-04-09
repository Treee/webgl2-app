import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Playground2dComponent } from './playground-2d.component';

describe('Playground2dComponent', () => {
  let component: Playground2dComponent;
  let fixture: ComponentFixture<Playground2dComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Playground2dComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Playground2dComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
