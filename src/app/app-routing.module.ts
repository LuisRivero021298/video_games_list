import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { ListComponent } from './pages/list/list.component';
import { GameComponent } from './pages/game/game.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

let routes: Routes = [
	{path: 'home', component: HomeComponent},
	{path: 'list', component: ListComponent},
	{path: 'game', component: GameComponent},
	{path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
	{path: '**', redirectTo: '/home', pathMatch: 'full'}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
  	RouterModule
  ]
})
export class AppRoutingModule { }
