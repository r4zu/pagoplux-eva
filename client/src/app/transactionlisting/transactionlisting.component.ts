import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-transactionlisting',
  templateUrl: './transactionlisting.component.html',
  styleUrls: ['./transactionlisting.component.css'],
})
export class TransactionlistingComponent {
  transactionList: any;

  constructor(private service: AuthService) {}

  LoadTransactions() {}
}
