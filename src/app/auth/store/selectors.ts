import {AuthStateInterface} from '../types/authState.interface'
import {createSelector} from '@ngrx/store'

export const selectFeature = (state: {auth: AuthStateInterface}) => state.auth
//create specific select for our submitted property
export const selectIsSubmitting = createSelector(
  selectFeature,
  (state) => state.isSubmitting
)
