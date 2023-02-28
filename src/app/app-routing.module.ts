import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from 'src/environments/environment.development';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path: 'airbnb',
    component: HomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: environment.production })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
