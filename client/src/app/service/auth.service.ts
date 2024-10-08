import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  apiUrl = 'http://localhost:3000/api/v1';

  ProceedRegister(inputData: any) {
    return this.http
      .post(this.apiUrl + '/auth/register', inputData)
      .pipe(catchError(this.handleError('getHeroes', [])));
  }
  ProceedLogin(inputData: any) {
    return this.http
      .post(this.apiUrl + '/auth/login', inputData)
      .pipe(catchError(this.handleError('getHeroes', [])));
  }
  ProceedTransaction(inputData: any) {
    return this.http.post(this.apiUrl + '/transactions', inputData);
  }
  GetTransactions(userId: any) {
    return this.http.get(this.apiUrl + '/transactions/' + userId);
  }

  IsLoggedIn() {
    return sessionStorage.getItem('token') !== null;
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
