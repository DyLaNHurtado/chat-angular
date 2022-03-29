import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import  { ModuleWithProviders} from "@angular/core";
import { MainComponent } from "./main.component";
import { ProfileComponent } from "../profile/profile.component";
import { HomeComponent } from "../home/home.component";

const routes: Routes = [

    {
      path:"", component:MainComponent,
      children: [
        {
          path:"home",component:HomeComponent
        },
        {
          path:"profile",
          component: ProfileComponent
        },

      ]
    },
    
  
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class MainRoutingModule { }
  