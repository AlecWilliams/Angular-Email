import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignoutComponent } from '../auth/signout/signout.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'signout', component: SignoutComponent, }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InboxRoutingModule { }
