import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable, switchMap, take, tap } from 'rxjs';
import { Candidate } from '../../models/candidate.model';
import { CandidateService } from '../../services/candidate.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-single-candidate',
  standalone: false,
  templateUrl: './single-candidate.component.html',
  styleUrl: './single-candidate.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SingleCandidateComponent implements OnInit {
  onGoBack() {
    this.router.navigateByUrl('/reactive-state/candidates');
  }
  onRefuse() {
    this.candidate$.pipe(
      take(1),
      tap(candidate => {
        this.candidateService.refuseCandidate(candidate.id);
        this.onGoBack();
      }

      )
    ).subscribe();
  }
  onHire() {
    this.candidate$.pipe(
      take(1),
      tap(candidate => {
        this.candidateService.hireCandidate(candidate.id);
        this.onGoBack();
      }

      )
    ).subscribe();
  }

  isLoading$!: Observable<boolean>;
  candidate$!: Observable<Candidate>;

  constructor(private candidateService: CandidateService, private route: ActivatedRoute, private router: Router) { }
  ngOnInit(): void {
    this.initObservables();
  }
  initObservables() {
    this.isLoading$ = this.candidateService.isLoading;
    this.candidate$ = this.route.params.pipe(
      switchMap(
        (params) => this.candidateService.getCandidateById(+params['id'])
      )

    )
  }

}
