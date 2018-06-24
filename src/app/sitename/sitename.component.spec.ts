/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SitenameComponent } from './sitename.component';

describe('SitenameComponent', () => {
  let component: SitenameComponent;
  let fixture: ComponentFixture<SitenameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SitenameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SitenameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
