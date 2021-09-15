import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersListComponent } from './components/users-list/users-list.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import {DetailDetailComponent} from './components/detail-detail/detail-detail.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './service/auth.guard';
const routes: Routes = [
{ path: '',  pathMatch:'full',redirectTo:'login'},
//{path:'login',component:AppComponent},
{path:'dashboard',component:DashboardComponent ,canActivate:[AuthGuard]},
{ path: 'users-list', component: UsersListComponent },
{ path: 'add-user', component: AddUserComponent },
{ path: 'update-user/:id', component: DetailDetailComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
