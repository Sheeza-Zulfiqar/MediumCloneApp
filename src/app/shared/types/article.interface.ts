import {PopularTagsType} from './popularTag.type'
import {ProfileInterfcae} from './profile.interface'

export interface ArticleInterface {
  body: string
  createdAt: string
  description: string
  favorited: boolean
  favoritesCount: number
  slug: string
  tagList: PopularTagsType[]
  title: string
  updatedAt: string
  //TODO Add author interface
  author: ProfileInterfcae
}
