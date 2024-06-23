import {Injectable} from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class PersistanceService {
  set(key: string, data: unknown): void {
    try {
      //data may of type number object, or string, we stringify it bacause in local storage we only store string
      localStorage.setItem(key, JSON.stringify(data))
    } catch (e) {
      console.error('Error saving to local storage', e)
    }
  }
  get(key: string): unknown {
    try {
      const localStorageItem = localStorage.getItem(key)
      return localStorageItem ? JSON.parse(localStorageItem) : null
    } catch (e) {
      console.error('Error getting from local storage', e)
      return null
    }
  }
}
