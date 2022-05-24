import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MainComponent } from "./main.component";
import { ProfileComponent } from "../profile/profile.component";
import { HomeComponent } from "../home/home.component";
import { AboutUsComponent } from "../aboutUs/aboutUs.component";
import { SettingsComponent } from "../settings/settings.component";

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
        {
          path:"settings",
          component: SettingsComponent
        },
        {
          path:"aboutUs",
          component: AboutUsComponent
        },

      ]
    },
    
  
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class MainRoutingModule { }
  