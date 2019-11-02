import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MainPage } from './main.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'team-list'
  },
  {
    path: '',
    component: MainPage,
    children: [
      {
        path: 'team-list',
        loadChildren: '../team-list/team-list.module#TeamListPageModule'
      },
      {
        path: 'test',
        loadChildren: '../test/test.module#TestPageModule'
      },
      {
        path: 'partida',
        loadChildren: '../partida/partida.module#PartidaPageModule'
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
  declarations: [MainPage]
})
export class MainPageModule {}
