import {inject} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {createSelector} from '@ngrx/store'
import {switchMap, map, Observable, catchError, of, tap} from 'rxjs'
import {AuthService} from '../services/auth.service'
import {authActions} from './action'
import {CurrentUserInterface} from 'src/app/shared/types/currentUser.interface'
import {HttpErrorResponse} from '@angular/common/http'
import {PersistanceService} from 'src/app/shared/services/persistance.service'
import {Router} from '@angular/router'

export const getCurrentUserEffect = createEffect(
  (
    actions$ = inject(Actions),
    authService = inject(AuthService),
    persistanceService = inject(PersistanceService)
  ) => {
    return actions$.pipe(
      ofType(authActions.getCurrentUser),
      switchMap(() => {
        const token = persistanceService.get('accessToken')
        if (!token) {
          return of(authActions.getCurrentUserFailure())
        }
        return authService.getCurrentUser().pipe(
          map((currentUser: CurrentUserInterface) => {
            return authActions.getCurrentUserSuccess({currentUser})
          }),
          catchError(() => {
            return of(authActions.getCurrentUserFailure())
          })
        )
      })
    )
  },
  {functional: true}
)

export const registerEffect = createEffect(
  (
    actions$ = inject(Actions),
    authService = inject(AuthService),
    persistanceService = inject(PersistanceService)
  ) => {
    return actions$.pipe(
      ofType(authActions.register),
      switchMap(({request}) => {
        return authService.register(request).pipe(
          map((currentUser: CurrentUserInterface) => {
            persistanceService.set('accessToken', currentUser.token)
            return authActions.registerSuccess({currentUser})
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              authActions.registerFailure({
                errors: errorResponse.error.errors,
              })
            )
          })
        )
      })
    )
  },
  {functional: true}
)

export const redirectAfterRegisterEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(authActions.registerSuccess),
      tap(() => {
        router.navigateByUrl('/')
      })
    )
  },
  {functional: true, dispatch: false}
)
//tap is kind of side effect inside stream

export const loginEffect = createEffect(
  (
    actions$ = inject(Actions),
    authService = inject(AuthService),
    persistanceService = inject(PersistanceService)
  ) => {
    return actions$.pipe(
      ofType(authActions.login),
      switchMap(({request}) => {
        return authService.login(request).pipe(
          map((currentUser: CurrentUserInterface) => {
            persistanceService.set('accessToken', currentUser.token)
            return authActions.loginSuccess({currentUser})
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              authActions.loginFailure({
                errors: errorResponse.error.errors,
              })
            )
          })
        )
      })
    )
  },
  {functional: true}
)

export const redirectAfterLoginEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(authActions.loginSuccess),
      tap(() => {
        router.navigateByUrl('/')
      })
    )
  },
  {functional: true, dispatch: false}
)
