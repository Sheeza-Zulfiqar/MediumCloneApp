import {state} from '@angular/animations'
import {TmplAstRecursiveVisitor} from '@angular/compiler'
import {createFeature, createReducer, on} from '@ngrx/store'
import {AuthStateInterface} from '../types/authState.interface'
import {authActions} from './action'
import {routerNavigationAction} from '@ngrx/router-store'

const initialState: AuthStateInterface = {
  isSubmitting: false,
  isLoading: false,
  currentUser: undefined,
  validationErrors: null,
}
const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialState,
    on(authActions.register, (state) => ({
      ...state,
      isSubmitting: true,
      validationErrors: null,
    })), //this construction will always return new state
    on(authActions.registerSuccess, (state, action) => ({
      ...state,
      isSubmitting: false,
      currentUser: action.currentUser,
    })),
    on(authActions.registerFailure, (state, action) => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors,
    })),
    on(authActions.login, (state) => ({
      ...state,
      isSubmitting: true,
      validationErrors: null,
    })), //this construction will always return new state
    on(authActions.loginSuccess, (state, action) => ({
      ...state,
      isSubmitting: false,
      currentUser: action.currentUser,
    })),
    on(authActions.loginFailure, (state, action) => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors,
    })),
    on(routerNavigationAction, (state) => ({...state, validationErrors: null})),
    on(authActions.getCurrentUser, (state) => ({
      ...state,
      isLoading: true,
    })), //this construction will always return new state
    on(authActions.getCurrentUserSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      currentUser: action.currentUser,
    })),
    on(authActions.getCurrentUserFailure, (state) => ({
      ...state,
      isLoading: false,
      currentUser: null, //means user unauthorized
    }))
  ),
})
//if we use createFeature, then it create for us a feature key, a reducer, and a bunch of selectors for all the properties that are getting in the state
export const {
  name: authFeatureKey,
  reducer: authReducer,
  selectIsSubmitting,
  selectIsLoading,
  selectCurrentUser,
  selectValidationErrors,
} = authFeature
