import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PricelistComponent } from './pricelist.component';

describe('PricelistComponent', () => {
  let component: PricelistComponent;
  let fixture: ComponentFixture<PricelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PricelistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PricelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
