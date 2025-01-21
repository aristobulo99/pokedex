import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    {
        path: 'home-pokedex',
        component: HomeComponent,
    },
    {
        path:'**',
        redirectTo: '/home-pokedex',
        pathMatch: 'full'
    }
];
@NgModule(
    {
        imports: [RouterModule.forRoot(routes)],
        exports: [RouterModule],
    }
) export class AppRoutingModule {}