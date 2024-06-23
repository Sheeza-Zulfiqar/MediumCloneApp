import {inject} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {catchError, map, of, switchMap} from 'rxjs'
import {PopularTagsType} from 'src/app/shared/types/popularTag.type'
import {PopularTagService} from '../popularTag.service'
import {getPopularTagsResponse} from '../types/getPopularTagsResponse.interface'
import {popularTagActions} from './actions'

export const getPopularTagsEffect = createEffect(
  (
    actions$ = inject(Actions),
    popularTagsService = inject(PopularTagService)
  ) => {
    return actions$.pipe(
      ofType(popularTagActions.getPopularTags),
      switchMap(() => {
        return popularTagsService.getPopularTags().pipe(
          map((popularTags: PopularTagsType[]) => {
            return popularTagActions.getPopularTagsSuccess({popularTags})
          }),
          catchError(() => {
            return of(popularTagActions.getPopularTagsFailure())
          })
        )
      })
    )
  },
  {functional: true}
)
