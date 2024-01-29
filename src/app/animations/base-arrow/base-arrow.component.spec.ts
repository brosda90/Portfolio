import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseArrowComponent } from './base-arrow.component';

describe('BaseArrowComponent', () => {
  let component: BaseArrowComponent;
  let fixture: ComponentFixture<BaseArrowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseArrowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BaseArrowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
