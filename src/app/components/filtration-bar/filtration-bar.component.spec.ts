import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltrationBarComponent } from './filtration-bar.component';

describe('FiltrationBarComponent', () => {
  let component: FiltrationBarComponent;
  let fixture: ComponentFixture<FiltrationBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltrationBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltrationBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
