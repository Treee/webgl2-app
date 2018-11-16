import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PathCellComponent } from './path-cell.component';

describe('PathCellComponent', () => {
  let component: PathCellComponent;
  let fixture: ComponentFixture<PathCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PathCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PathCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
