import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RegisterTeamPage } from './register-team.page';
import { RegisterPlayerPage } from '../register-player/register-player.page';
import { RegisterPlayerPageModule } from '../register-player/register-player.module';

const routes: Routes = [
  {
    path: '',
    component: RegisterTeamPage
  }
];

@NgModule({
  entryComponents:[
    RegisterPlayerPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    RegisterPlayerPageModule
  ],
  declarations: [RegisterTeamPage]
})
export class RegisterTeamPageModule {}
