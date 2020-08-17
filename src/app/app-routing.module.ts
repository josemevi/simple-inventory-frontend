import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { ItemEditComponent } from './item-edit/item-edit.component';
import { ItemAddComponent } from './item-add/item-add.component';
 
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'itemDetail/:id', component: ItemDetailComponent},
  { path: 'itemEdit/:id', component: ItemEditComponent },
  { path: 'itemAdd', component: ItemAddComponent },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  declarations: [],
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
