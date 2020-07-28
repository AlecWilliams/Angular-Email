import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  authForm = new FormGroup({
    username: new FormControl('',[
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^[A-Za-z0-9]+$/),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20),
    ])
  });

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    //If still signed in, send straight to  inbox
    this.authService.signedIn$.subscribe((signedIn) => 
    {
      if(signedIn)
      {
        this.router.navigateByUrl('/inbox');
      }
    })

  }

  onSubmit()
  {
    if(this.authForm.invalid)
    {
      return;
    }

    this.authService.signIn(this.authForm.value).subscribe(
    {
      next: () =>
      {
        //Redirect to inbox after successful sign in
        this.router.navigateByUrl('/inbox');
      },
      error: ({error}) => 
      {
        if(error.username || error.password)
        {
         this.authForm.setErrors({credentials: true});
        }
      }
    })
  }

}
