
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import 'rxjs/add/operator/toPromise';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";

@Injectable()
export default class landingFactory {
    updateTime = new BehaviorSubject<object>({});
    pdfSize = new BehaviorSubject<object>({});
  constructor( private http: HttpClient ) {
  };
  //add factory functions for returning data
  getTime(): Observable<object> {
    return this.http.get( './api/last_reviewed' );
  }
}