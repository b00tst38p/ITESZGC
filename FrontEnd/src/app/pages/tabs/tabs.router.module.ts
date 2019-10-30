import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'test',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../test/test.module').then(m => m.TestPageModule)
          }
        ]
      },
      {
        path: 'partida',
        children: [
          {
            path: '',
            loadChildren: () =>
            //import('pages/menu/menu.module').then(m => m.MenuPageModule)
            import('../partida/partida.module').then(m => m.PartidaPageModule)
          }
        ]
      }
      ,
      {
        path: 'partida',
        children: [
          {
            path: '',
            loadChildren: () =>
            //import('pages/menu/menu.module').then(m => m.MenuPageModule)
            import('../partida/partida.module').then(m => m.PartidaPageModule)
              
          }
        ]
      },
      {
        path: 'partida',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../partida/partida.module').then(m => m.PartidaPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/test',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/test',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
