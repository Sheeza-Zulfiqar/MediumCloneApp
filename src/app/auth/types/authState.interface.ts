import {CurrentUserInterface} from 'src/app/shared/types/currentUser.interface'
import {BackendErrorsInterface} from './backendErrors.interface'

export interface AuthStateInterface {
  isSubmitting: boolean
  currentUser: CurrentUserInterface | null | undefined
  //at the beginning we dont have user at all. this is why we set it to undefined, used undefined here means we did not make a request yet this is undefined
  // and we already made a request , but we didn't get a user back and then it will be null
  isLoading: boolean
  validationErrors: BackendErrorsInterface | null
}
