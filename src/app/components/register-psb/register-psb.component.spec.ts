import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPsbComponent } from './register-psb.component';

describe('RegisterPsbComponent', () => {
  let component: RegisterPsbComponent;
  let fixture: ComponentFixture<RegisterPsbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterPsbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterPsbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
