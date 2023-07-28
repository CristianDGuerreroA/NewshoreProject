/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { JsonViewDataComponent } from './json-view-data.component';

describe('JsonViewDataComponent', () => {
  let component: JsonViewDataComponent;
  let fixture: ComponentFixture<JsonViewDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JsonViewDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JsonViewDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
