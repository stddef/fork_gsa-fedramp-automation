import * as assertionDocumentation from './assertion-documetation';
import * as metrics from './metrics';
import * as routerMachine from './router-machine';
import {
  createSchematronMachine,
  SchematronMachine,
} from './schematron-machine';
import * as validatorMachine from './validator-machine';

export type NewState = {
  assertionDocumentation: assertionDocumentation.State;
  metrics: metrics.State;
  router: routerMachine.State;
  validator: validatorMachine.State;
};

export type NewEvent =
  | assertionDocumentation.Event
  | metrics.Event
  | routerMachine.Event
  | validatorMachine.Event;

export const initialState: NewState = {
  assertionDocumentation: assertionDocumentation.initialState,
  metrics: metrics.initialState,
  router: routerMachine.initialState,
  validator: validatorMachine.initialState,
};

export const rootReducer = (state: NewState, event: NewEvent) => ({
  assertionDocumentation: assertionDocumentation.nextState(
    state.assertionDocumentation,
    event as assertionDocumentation.Event,
  ),
  metrics: metrics.nextState(state.metrics, event as metrics.Event),
  router: routerMachine.nextState(state.router, event as routerMachine.Event),
  validator: validatorMachine.nextState(
    state.validator,
    event as validatorMachine.Event,
  ),
});

export type SampleDocument = {
  url: string;
  displayName: string;
};

export type State = {
  newAppContext: any;
  baseUrl: `${string}/`;
  oscalDocuments: {
    poam: SchematronMachine;
    sap: SchematronMachine;
    sar: SchematronMachine;
    ssp: SchematronMachine;
  };
  sourceRepository: {
    treeUrl?: string;
    sampleDocuments: SampleDocument[];
    developerExampleUrl?: string;
  };
};

export const state: State = {
  newAppContext: { state: initialState, dispatch: () => {} },
  baseUrl: '/',
  oscalDocuments: {
    poam: createSchematronMachine(),
    sap: createSchematronMachine(),
    sar: createSchematronMachine(),
    ssp: createSchematronMachine(),
  },
  sourceRepository: {
    sampleDocuments: [],
  },
};
