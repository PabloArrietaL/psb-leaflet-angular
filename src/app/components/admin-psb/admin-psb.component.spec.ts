import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPsbComponent } from './admin-psb.component';

describe('AdminPsbComponent', () => {
  let component: AdminPsbComponent;
  let fixture: ComponentFixture<AdminPsbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPsbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPsbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
