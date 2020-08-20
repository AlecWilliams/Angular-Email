import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

interface SignUpCredentials
{
  username: string;
  password; string;
  passwordConfirmation: string;
}
interface SignUpResponse
{
  username: string;
}
interface SignedInResponse
{
  authenticated: boolean;
  username: string;
}
interface SignInCredentials
{
  username: string;
  password: string;
}
interface SignInResponse{
  username: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  rootUrl = 'https://api.angular-email.com';
  signedIn$ = new BehaviorSubject(null); 
  username = '';

  usernameAvailable(username: string)
  {
    return this.http.post<{available: boolean}>(this.rootUrl + '/auth/username', {
      username
  });
  }

  signUp(credentials: SignUpCredentials)
  {
    return this.http.post<SignUpResponse>(this.rootUrl + '/auth/signup', credentials).pipe(
      tap((response) => 
      {
        //change to have to sign in after sign up
        this.signedIn$.next(true);
        this.username = response.username;
      })
    );
  }

  checkAuth()
  {
    return this.http.get<SignedInResponse>(this.rootUrl + '/auth/signedin').pipe(
      tap(({ authenticated, username }) => 
        {
          this.signedIn$.next(authenticated);
          this.username = username;
      })
    );
  }

  signOut()
  {
    return this.http.post(this.rootUrl + '/auth/signout', {}).pipe(
      tap(() => 
        {
          this.signedIn$.next(false);
      })
    );
  }

  signIn(credentials: SignInCredentials)
  {
    return this.http.post<SignInResponse>(this.rootUrl + '/auth/signin', credentials).pipe(
      tap(({ username } ) => 
      {
        this.signedIn$.next(true);
        this.username = username;
      })
    )
  }
}
