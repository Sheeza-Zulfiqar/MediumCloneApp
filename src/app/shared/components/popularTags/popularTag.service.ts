import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {map, Observable} from 'rxjs'
import {environment} from 'src/environments/environment'
import {PopularTagsType} from '../../types/popularTag.type'
import {getPopularTagsResponse} from './types/getPopularTagsResponse.interface'

@Injectable({
  providedIn: 'root',
})
export class PopularTagService {
  constructor(private http: HttpClient) {}

  getPopularTags(): Observable<PopularTagsType[]> {
    const url = environment.apiUrl
    return this.http
      .get<getPopularTagsResponse>(url)
      .pipe(map((response) => response.tags))
  }
}
