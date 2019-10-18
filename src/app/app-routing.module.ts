import { NgModule } from "@angular/core";
import { CommonModule, APP_BASE_HREF } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";

import { IndexComponent } from "./pages/index/index.component";
import { LoginComponent } from "./pages/examples/Login/login.component";
import { RegisterComponent } from "./pages/examples/register/register.component";
import { ProfilepageComponent} from "./pages/examples/profilepage/profilepage.component";



const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: IndexComponent },
  { path: "login", component: LoginComponent },
  { path: "profile", component: ProfilepageComponent },
  { path: "register", component: RegisterComponent }

  
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [{provide: APP_BASE_HREF, useValue : '/' }]
})
export class AppRoutingModule {}

