import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionlistingComponent } from './transactionlisting.component';

describe('TransactionlistingComponent', () => {
  let component: TransactionlistingComponent;
  let fixture: ComponentFixture<TransactionlistingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransactionlistingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TransactionlistingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
