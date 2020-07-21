import { createReducer, on, Action } from '@ngrx/store';
import { onNgrxForms, setValue, formGroupReducer } from 'ngrx-forms';

import { updateGroup, validate, createFormGroupState } from 'ngrx-forms';
import { required } from 'ngrx-forms/validation';
import { FormGroupState } from 'ngrx-forms';

import { growerLoad } from './simple-form.action';

export interface Grower {
  name: string;
  state: string;
  comodity: string;
  area: number;
};

export interface AppState {
  onboardingForm: FormGroupState<Grower>;
}

export const initialGrowerState: Grower = {
  name: '',
  state: '',
  comodity: '',
  area: 0,
};

export const initialFormState = {
  growerOnboarding: createFormGroupState<Grower>('growerOnboarding', initialGrowerState),
};

const _growerReducer = createReducer(
  initialFormState,
  onNgrxForms(),
  on(growerLoad, (state) => {
    const growerFromDatabase = loadData();
    const growerOnboarding = setValue(state.growerOnboarding, growerFromDatabase);
    return {...state, growerOnboarding};
  })
);

export function growerReducer(state, action) {
  return _growerReducer(state, action);
}

function loadData() {
  return {
    name: 'Ricardo',
    state: 'Nevada',
    comodity: 'Corn',
    area: 100,
  };
}
