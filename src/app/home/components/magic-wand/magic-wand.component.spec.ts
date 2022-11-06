import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MagicWandComponent } from './magic-wand.component';

describe('MagicWandComponent', () => {
  let component: MagicWandComponent;
  let fixture: ComponentFixture<MagicWandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MagicWandComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MagicWandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
