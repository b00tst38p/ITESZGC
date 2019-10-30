import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'test', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'test', loadChildren: './pages/test/test.module#TestPageModule' },
  { path: 'partida', loadChildren: './pages/partida/partida.module#PartidaPageModule' },
  { path: 'tabs', loadChildren: './pages/tabs/tabs.module#TabsPageModule' },
  { path: 'register-team/:index', loadChildren: './pages/register-team/register-team.module#RegisterTeamPageModule' },
  { path: 'register-team/:index/:team', loadChildren: './pages/register-team/register-team.module#RegisterTeamPageModule' },
  { path: 'team-list', loadChildren: './pages/team-list/team-list.module#TeamListPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
