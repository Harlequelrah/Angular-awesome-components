import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CandidateService } from '../../services/candidate.service';

@Component({
  selector: 'app-candidate-list',
  standalone: false,
  templateUrl: './candidate-list.component.html',
  styleUrl: './candidate-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CandidateListComponent implements OnInit {
  constructor(private candidateService: CandidateService) { }
  isLoading$!: Observable<boolean>;
  ngOnInit(): void {
    this.isLoading$ = this.candidateService.isLoading;
  }

}
