import { Component, OnInit, Input } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-jugador',
  templateUrl: './jugador.component.html',
  styleUrls: ['./jugador.component.scss'],
})
export class JugadorComponent implements OnInit {
  @Input('player') player: any;
  @Input('partida') partida: any;
  @Input('match') match: number;
  
  private buttonColor: string = "primary";
  cont: number = 0;

  variable: number = 0;
  constructor(private dataService: DataServiceService) {

  }

  ngOnInit() {
    console.log("datos " + this.partida + this.match);
  }

  setWinner(player) {
    if (this.match == null) {
      this.dataService.setWinnerP(this.partida, player);
    }
  }

  setPosition(){
    //Revisamos de entre las partidas, aquella en la que se encuentra este jugador
    if(this.dataService.information[this.dataService.information[0].position].tipo == "Simple") {
      console.log("Primer Caso");
      this.player.estado = this.dataService.posicion+1;
      this.dataService.posicion++;
    }
    else if(this.dataService.information[this.dataService.information[0].position].tipo == "Match"){
      console.log("Segundo Caso");
        
        this.dataService.posicion=0;
        this.player.estado = this.dataService.posicion+1;
        this.dataService.information[1].children[1].estado="2";
    }
    console.log(this.dataService.information[0].children[0]);
   // this.player.estado = this.dataService.posicion+1;
   // this.dataService.posicion++;
  }

}
