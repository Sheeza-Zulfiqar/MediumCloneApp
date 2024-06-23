import {Route} from '@angular/router'

export const appRoutes: Route[] = [
  {
    path: 'register',
    //lazy loading
    loadChildren: () =>
      import('src/app/auth/auth.routes').then((m) => m.registerRoutes),
  },
  {
    path: 'login',
    //lazy loading
    loadChildren: () =>
      import('src/app/auth/auth.routes').then((m) => m.loginRoutes),
  },
  {
    path: '',
    //lazy loading
    loadChildren: () =>
      import('src/app/globalFeed/globalFeed.routes').then((m) => m.routes),
  },
]
