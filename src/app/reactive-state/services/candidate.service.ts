import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Candidate } from '../models/candidate.model';

@Injectable()
export class CandidateService {

  constructor(private http: HttpClient) { }
  private _isLoading$ = new BehaviorSubject<boolean>(false);
  get isLoading(): Observable<boolean> {
    return this._isLoading$.asObservable();
  }
  private _candidates$ = new BehaviorSubject<Candidate[]>([]);
  get candidates(): Observable<Candidate[]> {
    return this._candidates$.asObservable();
  }

  private setLoadingStatus(loading: boolean) {
    this._isLoading$.next(loading);
  }
}
