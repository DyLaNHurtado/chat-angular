import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
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
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
