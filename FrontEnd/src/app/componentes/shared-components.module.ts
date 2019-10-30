import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { JugadorComponent } from './jugador/jugador.component';

@NgModule({
  declarations: [JugadorComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [JugadorComponent]
})
export class SharedComponentsModule { }
