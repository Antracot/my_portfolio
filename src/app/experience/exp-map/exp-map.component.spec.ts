import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpMapComponent } from './exp-map.component';

describe('ExpMapComponent', () => {
  let component: ExpMapComponent;
  let fixture: ComponentFixture<ExpMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
