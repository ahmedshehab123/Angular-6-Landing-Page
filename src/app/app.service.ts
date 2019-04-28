import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class AppService {

  constructor(private http: HttpClient) {
  }

  getCoin(exchange, coinName, date): Observable<any> {
    // return this.http.get('https://admin.coinget.io:8080/api/search/' + exchange + '/' + coinName + '/' + date);
     return this.http.get('http://localhost:8080/api/search/' + exchange + '/' + coinName + '/' + date);

  }

  getCoin2(exchange, coinName, date): Observable<any> {
    return this.http.get('http://localhost:8080/api/search/' + exchange + '/' + coinName + '/' + date);

    // return this.http.get('https://admin2.coinget.io:8080/api/search/' + exchange + '/' + coinName + '/' + date);
  }

  getPrices(): Observable<any> {
    // return this.http.get('http://localhost:8080/api/prices');

    return this.http.get('https://admin.coinget.io:8080/api/prices');
  }
}
