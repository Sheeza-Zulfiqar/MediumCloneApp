import {bootstrapApplication} from '@angular/platform-browser'
import {provideRouter} from '@angular/router'

import {AppComponent} from './app/app.component'
import {appRoutes} from './app/app.routes'
import {provideStore, provideState} from '@ngrx/store'
import {provideEffects} from '@ngrx/effects'
import {provideStoreDevtools} from '@ngrx/store-devtools'
import {isDevMode} from '@angular/core'
import {authFeatureKey, authReducer} from './app/auth/store/reducer'
import {provideHttpClient, withInterceptors} from '@angular/common/http'
import * as authEffects from './app/auth/store/effect'
import * as feedEffects from './app/shared/components/feed/store/effect'
import {provideRouterStore, routerReducer} from '@ngrx/router-store'
import queryString from 'query-string'
import {authInterceptor} from './app/shared/services/authInterceptor'
import {
  feedFeatureKey,
  feedReducer,
} from './app/shared/components/feed/store/reducer'

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptors([authInterceptor])),
    provideRouter(appRoutes),
    provideStore({
      router: routerReducer,
    }),
    provideRouterStore(),
    provideState(authFeatureKey, authReducer),
    provideState(feedFeatureKey, feedReducer),
    provideEffects(authEffects, feedEffects),
    provideStoreDevtools({
      maxAge: 25, // max amount of actions we are storing
      logOnly: !isDevMode(),
      autoPause: true, //to avoid too many actions
      trace: false,
      traceLimit: 75,
    }),
  ],
})
