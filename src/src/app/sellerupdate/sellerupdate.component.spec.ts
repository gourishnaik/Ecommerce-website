import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerupdateComponent } from './sellerupdate.component';

describe('SellerupdateComponent', () => {
  let component: SellerupdateComponent;
  let fixture: ComponentFixture<SellerupdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellerupdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellerupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
