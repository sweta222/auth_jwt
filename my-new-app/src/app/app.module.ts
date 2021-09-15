import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddUserComponent } from './components/add-user/add-user.component';
import { DetailDetailComponent } from './components/detail-detail/detail-detail.component';
import { UsersListComponent } from './components/users-list/users-list.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule , HTTP_INTERCEPTORS} from '@angular/common/http';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthInterceptor } from './service/authconfig.interceptor';
@NgModule({
  declarations: [
    AppComponent,
    AddUserComponent,
    DetailDetailComponent,
    UsersListComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,ReactiveFormsModule,HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
