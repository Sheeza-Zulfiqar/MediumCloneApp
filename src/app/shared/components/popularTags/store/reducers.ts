import {createFeature, createReducer, on} from '@ngrx/store'
import {PopularTagsStateInterface} from '../types/popularTagsState.interface'
import {popularTagActions} from './actions'

const initialState: PopularTagsStateInterface = {
  isLoading: false,
  error: null,
  data: null,
}
const popularTagsFeature = createFeature({
  name: 'feed',
  reducer: createReducer(
    initialState,
    on(popularTagActions.getPopularTags, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(popularTagActions.getPopularTagsSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      data: action.popularTags,
    })),
    on(popularTagActions.getPopularTagsFailure, (state) => ({
      ...state,
      isLoading: false,
    }))
  ),
})

export const {
  name: popularTagsFeatureKey,
  reducer: popularTagsReducer,
  selectIsLoading,
  selectError,
  selectData: selectpopularTagsData,
} = popularTagsFeature
