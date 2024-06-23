import {createAction, createActionGroup, props, emptyProps} from '@ngrx/store'
import {CurrentUserInterface} from 'src/app/shared/types/currentUser.interface'
import {BackendErrorsInterface} from '../types/backendErrors.interface'
import {LoginRequestInterface} from '../types/loginRequest.interface'
import {RegisterRequestInterface} from '../types/registerRequest.interface'
//all our actions for ngrx are global which means whole application has list of all the actions
// export const register = createAction(
//   '[Auth] Register',
//   props<{request: RegisterRequestInterface}>()
// )
// //for effects we typically need three actions
// export const registerSuccess = createAction(
//   '[Auth] Register Success',
//   props<{request: RegisterRequestInterface}>()
// )
// export const registerFailure = createAction(
//   '[Auth] Register Failure',
//   props<{request: RegisterRequestInterface}>()
// )
export const authActions = createActionGroup({
  source: 'auth',
  events: {
    Register: props<{request: RegisterRequestInterface}>(),
    'Register success': props<{currentUser: CurrentUserInterface}>(),
    'Register failure': props<{errors: BackendErrorsInterface}>(),

    Login: props<{request: LoginRequestInterface}>(),
    'Login success': props<{currentUser: CurrentUserInterface}>(),
    'Login failure': props<{errors: BackendErrorsInterface}>(),

    'Get Current user': emptyProps(),
    'Get Current user success': props<{currentUser: CurrentUserInterface}>(),
    'Get Current user failure': emptyProps(),
  },
})
