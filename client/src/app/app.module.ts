import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component'
import { ButtonComponent } from './components/button/button.component'
import { TodoComponent } from './components/todo/todo.component'
import {RouterModule, Routes} from "@angular/router";
import { AddTodoComponent } from './components/add-todo/add-todo.component';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { LoginComponent } from './components/login/login.component';
import { LogUserInComponent } from './components/log-user-in/log-user-in.component';
import {authInterceptorProviders} from "./services/AuthInterceptor";
import { LogoutComponent } from './components/logout/logout.component';
import {errorInterceptorProviders} from "./services/ErrorInterceptor";

const appRoutes: Routes = [
  { path: '', component: TodoComponent}, {path:'signup', component: RegistrationComponent}, {path:'login', component:LoginComponent}, {path: 'logout', component: LogoutComponent},

];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ButtonComponent,
    TodoComponent,
    TodoItemComponent,
    AddTodoComponent,
    RegistrationComponent,
    RegisterUserComponent,
    LoginComponent,
    LogUserInComponent,
    LogoutComponent,
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes, {enableTracing: true})
  ],
  providers: [authInterceptorProviders, errorInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
