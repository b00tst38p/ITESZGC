import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PartidaPage } from './partida.page';
import { SharedComponentsModule } from 'src/app/componentes/shared-components.module';

const routes: Routes = [
  {
    path: '',
    component: PartidaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SharedComponentsModule
  ],
  declarations: [PartidaPage]
})
export class PartidaPageModule {}
