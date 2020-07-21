import { createReducer, on } from '@ngrx/store';
import {
  onNgrxForms,
  setValue,
  wrapReducerWithFormStateUpdate,
} from 'ngrx-forms';

import { updateGroup, validate, createFormGroupState } from 'ngrx-forms';
import { required } from 'ngrx-forms/validation';
import { FormGroupState } from 'ngrx-forms';

import { growerLoad } from './simple-form.action';

export interface Grower {
  name: string;
  state: string;
  comodity: string;
  area: number;
}

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
  growerOnboarding: createFormGroupState<Grower>(
    'growerOnboarding',
    initialGrowerState
  ),
};

export const validateGrowerForm = updateGroup<Grower>({
  name: validate(required),
  state: validate((stateName) =>
    !isStateValid(stateName as string) ? { invalid: true } : {}
  ),
  comodity: validate(required),
  area: validate(required),
});

const isStateValid = (stateName = '') => {
  const validStates = [
    'alabama',
    'alaska',
    'american samoa',
    'arizona',
    'arkansas',
    'california',
    'colorado',
    'connecticut',
    'delaware',
    'district of columbia',
    'federated states of micronesia',
    'florida',
    'georgia',
    'guam',
    'hawaii',
    'idaho',
    'illinois',
    'indiana',
    'iowa',
    'kansas',
    'kentucky',
    'louisiana',
    'maine',
    'marshall islands',
    'maryland',
    'massachusetts',
    'michigan',
    'minnesota',
    'mississippi',
    'missouri',
    'montana',
    'nebraska',
    'nevada',
    'new hampshire',
    'new jersey',
    'new mexico',
    'new york',
    'north carolina',
    'north dakota',
    'northern mariana islands',
    'ohio',
    'oklahoma',
    'oregon',
    'palau',
    'pennsylvania',
    'puerto rico',
    'rhode island',
    'south carolina',
    'south dakota',
    'tennessee',
    'texas',
    'utah',
    'vermont',
    'virgin islands',
    'virginia',
    'washington',
    'west virginia',
    'wisconsin',
    'wyoming',
  ];

  return validStates.indexOf(stateName.toLocaleLowerCase()) > -1;
};

const _growerReducer = createReducer(
  initialFormState,
  onNgrxForms(),
  on(growerLoad, (state) => {
    const growerFromDatabase = loadData();
    const growerOnboarding = setValue(
      state.growerOnboarding,
      growerFromDatabase
    );
    return { ...state, growerOnboarding };
  })
);

export function growerReducer(state, action) {
  const reducer = wrapReducerWithFormStateUpdate(
    _growerReducer,
    (state) => state.growerOnboarding,
    validateGrowerForm
  );
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
