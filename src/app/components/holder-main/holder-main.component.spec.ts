import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HolderMainComponent } from './holder-main.component';

describe('HolderMainComponent', () => {
  let component: HolderMainComponent;
  let fixture: ComponentFixture<HolderMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HolderMainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HolderMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
