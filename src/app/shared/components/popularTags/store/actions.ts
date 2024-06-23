import {createActionGroup, emptyProps, props} from '@ngrx/store'
import {PopularTagsType} from 'src/app/shared/types/popularTag.type'

export const popularTagActions = createActionGroup({
  source: 'popular tags',
  events: {
    'Get popular tags': emptyProps(),
    'Get popular tags success': props<{popularTags: PopularTagsType[]}>(),
    'Get popular tags failure': emptyProps(),
  },
})
