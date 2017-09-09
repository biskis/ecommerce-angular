import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductInListComponent } from './product-in-list.component';

describe('ProductInListComponent', () => {
  let component: ProductInListComponent;
  let fixture: ComponentFixture<ProductInListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductInListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductInListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
