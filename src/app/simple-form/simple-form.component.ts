import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { Grower, AppState } from './simple-form.reducer';
import { growerLoad } from './simple-form.action';
import { Observable } from 'rxjs';
import { FormGroupState } from 'ngrx-forms';

@Component({
  selector: 'app-simple-form',
  templateUrl: './simple-form.component.html',
  styleUrls: ['./simple-form.component.scss'],
})
export class SimpleFormComponent implements OnInit {
  onboardingForm$: Observable<FormGroupState<Grower>>;

  constructor(private store: Store<{ growerStore }>) {
    this.onboardingForm$ = store
      .pipe(select('growerStore'))
      .pipe(select('growerOnboarding'));
  }

  ngOnInit(): void {
    this.store.dispatch(growerLoad());
  }
}
