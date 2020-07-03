import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { ChartsModule } from "ng2-charts";
//routes
import { AppRoutingModule } from "./app-routing.module";

//pipes
import { AgePipe } from "./pipes/age.pipe";

//components and pages
import { AppComponent } from "./app.component";
import { HomeComponent } from "./pages/home/home.component";
import { ListComponent } from "./pages/list/list.component";
import { GameComponent } from "./pages/game/game.component";
import { NavbarComponent } from "./components/shared/navbar/navbar.component";
import { LoginComponent } from "./pages/login/login.component";
import { RegisterComponent } from "./pages/register/register.component";
import { FormComponent } from "./components/form/form.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ChartComponent } from "./components/chart/chart.component";
import { EditProfileComponent } from "./pages/edit-profile/edit-profile.component";
import { RatingComponent } from "./pages/rating/rating.component";
import { BtnAddComponent } from './components/shared/btn-add/btn-add.component';

@NgModule({
  declarations: [
    AgePipe,
    AppComponent,
    HomeComponent,
    ListComponent,
    GameComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    FormComponent,
    ChartComponent,
    EditProfileComponent,
    RatingComponent,
    BtnAddComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
