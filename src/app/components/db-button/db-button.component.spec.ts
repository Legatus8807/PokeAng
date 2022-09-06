import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DbButtonComponent } from './db-button.component';

describe('DbButtonComponent', () => {
  let component: DbButtonComponent;
  let fixture: ComponentFixture<DbButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DbButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DbButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
