import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WrapperAddressesComponent } from './wrapper-addresses.component';

describe('WrapperAddressesComponent', () => {
  let component: WrapperAddressesComponent;
  let fixture: ComponentFixture<WrapperAddressesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WrapperAddressesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WrapperAddressesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
