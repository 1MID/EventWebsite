import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaperMaskComponent } from './paper-mask.component';

describe('PaperMaskComponent', () => {
  let component: PaperMaskComponent;
  let fixture: ComponentFixture<PaperMaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaperMaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaperMaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
