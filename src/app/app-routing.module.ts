import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent} from "./pages/register/register.component";

const routes: Routes = [
  { path: 'register', component: RegisterComponent }, // Route for the register page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
