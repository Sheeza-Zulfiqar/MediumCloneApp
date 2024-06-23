import {CommonModule} from '@angular/common'
import {Component} from '@angular/core'
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms'
import {RouterLink} from '@angular/router'
import {Store} from '@ngrx/store'
import {combineLatest} from 'rxjs'
import {BackendErrorMessages} from 'src/app/shared/components/backendErrorMessages/backendErrorMessages.component'
import {AuthService} from '../../services/auth.service'
import {authActions} from '../../store/action'
//import {selectIsSubmitting} from '../../store/selectors'
import {selectIsSubmitting, selectValidationErrors} from '../../store/reducer'
import {AuthStateInterface} from '../../types/authState.interface'
import {RegisterRequestInterface} from '../../types/registerRequest.interface'
@Component({
  selector: 'mc-register',
  templateUrl: './register.component.html',
  standalone: true,
  //if you want to enable link inside your component, you must inject router link to your component
  imports: [
    ReactiveFormsModule,
    RouterLink,
    CommonModule,
    BackendErrorMessages,
  ],
})
export class RegisterComponent {
  //reactive forms is the best possible variant to create forms inside Angular, u must inject form build inside constructo
  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  })
  //use dollar sign because we are getting our data as a stream
  // isSubmitting$  is now a boolean observable which means we can subscribe to it and  every single change in state will change this property
  // isSubmitting$ = this.store.select(selectIsSubmitting)
  // backendErrors$ = this.store.select(selectValidationErrors)
  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationErrors),
  })
  constructor(
    private fb: FormBuilder,
    private store: Store, //<{auth: AuthStateInterface}>,
    private authService: AuthService
  ) {}

  onSubmit() {
    console.log('form', this.form.getRawValue())
    const request: RegisterRequestInterface = {
      user: this.form.getRawValue(),
    }
    this.store.dispatch(authActions.register({request}))
    // this.authService
    //   .register(request)
    //   .subscribe((res) => console.log('res', res))
  }
}
