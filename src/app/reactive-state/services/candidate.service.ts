import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, map, Observable, switchMap, take, tap } from 'rxjs';
import { Candidate } from '../models/candidate.model';
import { environment } from '../../../environments/environment';

@Injectable()
export class CandidateService {

  constructor(private http: HttpClient) { }
  private _isLoading$ = new BehaviorSubject<boolean>(false);
  get isLoading(): Observable<boolean> {
    return this._isLoading$.asObservable();
  }
  private _candidates$ = new BehaviorSubject<Candidate[]>([]);
  get candidates$(): Observable<Candidate[]> {
    return this._candidates$.asObservable();
  }
  private lastCandidatesLoad = 0;

  private setLoadingStatus(loading: boolean) {
    this._isLoading$.next(loading);
  }
  getCandidates(): void {
    if (Date.now() - this.lastCandidatesLoad <= 300000) {
      return;
    }
    this.http.get<Candidate[]>(`${environment.apiUrl}/candidates`).pipe(
      tap(candidates => {
        this.lastCandidatesLoad = Date.now();
        this.setLoadingStatus(true);
        delay(1000);
        this._candidates$.next(candidates);
        this.setLoadingStatus(false);
      })
    ).subscribe();
  }
  getCandidateById(id: number): Observable<Candidate> {
    if (!this.lastCandidatesLoad) {
      this.getCandidates();
    }
    return this.candidates$.pipe(
      map(
        candidates => candidates.filter(candidate => candidate.id === id)[0]
      )
    );
  }
  refuseCandidate(id: number): void {
    this.setLoadingStatus(true);
    this.http.delete(`${environment.apiUrl}/candidates/${id}`).pipe(
      delay(1000),
      switchMap(() => this.candidates$),
      take(1),
      map(candidates => candidates.filter(candidate => candidate.id !== id)),
      tap(
        candidates => {
          this._candidates$.next(candidates);
          this.setLoadingStatus(false);
        }
      )
    ).subscribe();
  }
  hireCandidate(id: number) {
    this.candidates$.pipe(
      take(1),
      map(
        candidates =>
          candidates.map(candidate => candidate.id === id ? { ...candidate, company: 'Snapface Ltd' } : candidate)
      ),
      tap(updatedCandidates => this._candidates$.next(updatedCandidates)),
      switchMap(
        updatedCandidates => this.http.patch(`${environment.apiUrl}/candidates/${id}`, updatedCandidates.find(candidate => candidate.id === id))
      )
    ).subscribe();
  }
}
