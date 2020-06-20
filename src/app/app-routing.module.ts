import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AuthGuard } from "./guards/auth.guard";
import { NoAuthGuard } from "./guards/noAuth.guard"; 

import { HomeComponent } from "./pages/home/home.component";
import { ListComponent } from "./pages/list/list.component";
import { GameComponent } from "./pages/game/game.component";
import { LoginComponent } from "./pages/login/login.component";
import { RegisterComponent } from "./pages/register/register.component";
import { EditProfileComponent } from "./pages/edit-profile/edit-profile.component";
import { RatingComponent } from "./pages/rating/rating.component";

let routes: Routes = [
  { path: "home", component: HomeComponent, canActivate: [AuthGuard] },
  { path: "list", component: ListComponent, canActivate: [AuthGuard] },
  { path: "game", component: GameComponent, canActivate: [AuthGuard] },
  { path: "login", component: LoginComponent, canActivate: [NoAuthGuard] },
  { path: "register", component: RegisterComponent, canActivate: [NoAuthGuard] },
  { path: "edit-profile", component: EditProfileComponent },
  { path: "rating", component: RatingComponent},
  { path: "**", redirectTo: "login", pathMatch: "full" },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
