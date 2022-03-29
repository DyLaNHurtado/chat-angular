import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [

  {
    path:"login", component:LoginComponent
  },
  {
    path:"register", component: RegisterComponent
  },
  {
    path:"", loadChildren:()=>import ("./components/main/main.module").then(m=>m.MainModule)
  },
  {
    path:"**" ,component:NotFoundComponent
  }
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
