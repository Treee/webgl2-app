import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PathFinderCellComponent } from './path-finder-cell.component';

describe('PathFinderCellComponent', () => {
  let component: PathFinderCellComponent;
  let fixture: ComponentFixture<PathFinderCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PathFinderCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PathFinderCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
