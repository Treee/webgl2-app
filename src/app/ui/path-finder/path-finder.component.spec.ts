import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PathFinderComponent } from './path-finder.component';

describe('PathFinderComponent', () => {
  let component: PathFinderComponent;
  let fixture: ComponentFixture<PathFinderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PathFinderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PathFinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
