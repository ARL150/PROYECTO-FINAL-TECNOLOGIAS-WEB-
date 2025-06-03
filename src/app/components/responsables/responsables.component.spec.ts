<<<<<<< HEAD
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsablesComponent } from './responsables.component';

describe('ResponsablesComponent', () => {
  let component: ResponsablesComponent;
  let fixture: ComponentFixture<ResponsablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResponsablesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResponsablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
=======
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsablesComponent } from './responsables.component';

describe('ResponsablesComponent', () => {
  let component: ResponsablesComponent;
  let fixture: ComponentFixture<ResponsablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResponsablesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResponsablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
>>>>>>> 3c3fff0510d2422c6cc03ae2a209a8bdf5ac1dff
