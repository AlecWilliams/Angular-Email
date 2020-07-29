import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Email } from '../email';

@Component({
  selector: 'app-email-show',
  templateUrl: './email-show.component.html',
  styleUrls: ['./email-show.component.css']
})
export class EmailShowComponent implements OnInit {

  email: Email;


  constructor(private route: ActivatedRoute) 
  { 
    //pull snapshot to display email instantly
    this.email = this.route.snapshot.data.email;

    //Apply any changes made to which email is being viewed
    this.route.data.subscribe(({ email }) =>
    {
      this.email = email;
    });
  }

  ngOnInit(): void {
  
     }

}
