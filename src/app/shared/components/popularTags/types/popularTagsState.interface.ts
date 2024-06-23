import {PopularTagsType} from 'src/app/shared/types/popularTag.type'

export interface PopularTagsStateInterface {
  isLoading: boolean
  error: string | null
  data: PopularTagsType[] | null
}
