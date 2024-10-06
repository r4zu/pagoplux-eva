import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-transactionlisting',
  templateUrl: './transactionlisting.component.html',
  styleUrls: ['./transactionlisting.component.css'],
})
export class TransactionlistingComponent implements OnInit {
  transactionList: any;
  loadingSpinner = true;

  constructor(private service: AuthService) {}

  ngOnInit(): void {
    this.LoadTransactions();
  }

  LoadTransactions() {
    const userId = sessionStorage.getItem('userId');
    this.service.GetTransactions(userId).subscribe((result) => {
      this.loadingSpinner = false;
      this.transactionList = result;
      console.log(this.transactionList);
    });
  }
}
