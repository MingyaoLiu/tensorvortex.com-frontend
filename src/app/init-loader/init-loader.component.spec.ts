import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InitLoaderComponent } from './init-loader.component';

describe('InitLoaderComponent', () => {
  let component: InitLoaderComponent;
  let fixture: ComponentFixture<InitLoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InitLoaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InitLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
