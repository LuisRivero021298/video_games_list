import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';

//routes
import { AppRoutingModule } from './app-routing.module';

//components and pages
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { ListComponent } from './pages/list/list.component';
import { GameComponent } from './pages/game/game.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { FormComponent } from './components/form/form.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartComponent } from './components/chart/chart.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListComponent,
    GameComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    FormComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
