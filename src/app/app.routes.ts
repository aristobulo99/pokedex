import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';
import { PokemonDetailComponent } from './pages/home/components/pokemon-detail/pokemon-detail.component';

export const routes: Routes = [
    {
        path: 'home-pokedex',
        component: HomeComponent,
        children: [
            {
                path: 'pokemon/:id',
                component: PokemonDetailComponent,
                outlet: 'dialog'
            }
        ]
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