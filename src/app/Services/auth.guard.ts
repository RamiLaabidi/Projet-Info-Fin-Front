import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
   const router = inject(Router)
   if (auth.isLoggedIn() && auth.currentUser()?.role === 'JOUEUR' ) {
     return true ;
   }
   else {
     router.navigate(['/login']);
     return false ;
   }
  };

   export const LoggedGuard: CanActivateFn = (route, state) => {
    const auth = inject(AuthService);
    const router = inject(Router)
    if (!auth.isLoggedIn() ) {
      return true ;
    }
    else {
      router.navigate(['/']);
      return false;
    }
};
