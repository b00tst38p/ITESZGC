import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'test'
  },
  {
    path: '',
    component: TabsPage,
    children: [
      
      {
        path: 'team-list',
        loadChildren: './pages/team-list/team-list.module#TeamListPageModule'
      },
      {
        path: 'test',
        loadChildren: './pages/test/test.module#TestPageModule'
      },
      {
        path: 'partida',
        loadChildren: './pages/partida/partida.module#PartidaPageModule'
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
