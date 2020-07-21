import { createReducer, on } from '@ngrx/store';
import { onNgrxForms, setValue, wrapReducerWithFormStateUpdate } from 'ngrx-forms';

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

export const validateGrowerForm = updateGroup<Grower>({
  name: validate(required),
  state: validate(required),
  comodity: validate(required),
  area: validate(required),
});

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
  const reducer = wrapReducerWithFormStateUpdate(
    _growerReducer,
    state => state.growerOnboarding,
    validateGrowerForm
  )
  return reducer(state, action);
}

function loadData() {
  return {
    name: 'Ricardo',
    state: 'Nevada',
    comodity: 'Corn',
    area: 100,
  };
}
