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
  
  constructor(private dataService: DataServiceService) { }

  ngOnInit() {
    //console.log("datos " + this.partida + this.match);
  }

  setWinner(player) {
    if (this.match == null) {
      this.dataService.setWinnerP(this.partida, player);
    }
  }

  setPosition(){
    if(this.dataService.information[this.partida].tipo == "Simple"){
      this.player.position = this.dataService.information[this.partida].lastPosition+1;
      this.dataService.information[this.partida].lastPosition++;
    }
    else if(this.dataService.information[this.partida].tipo == "Match"){
      this.player.position = this.dataService.information[this.partida].children[this.match].lastPosition+1;
      this.dataService.information[this.partida].children[this.match].lastPosition++;
    }
  }
}
