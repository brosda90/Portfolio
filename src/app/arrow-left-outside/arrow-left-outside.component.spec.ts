import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrowLeftOutsideComponent } from './arrow-left-outside.component';

describe('ArrowLeftOutsideComponent', () => {
  let component: ArrowLeftOutsideComponent;
  let fixture: ComponentFixture<ArrowLeftOutsideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArrowLeftOutsideComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArrowLeftOutsideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
