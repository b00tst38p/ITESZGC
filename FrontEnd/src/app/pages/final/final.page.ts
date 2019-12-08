import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-final',
  templateUrl: './final.page.html',
  styleUrls: ['./final.page.scss'],
})
export class FinalPage implements OnInit {
  automaticClose = false;
  
  constructor(
    private dataService: DataServiceService, 
    private toastCtrl: ToastController,
  ) { 

    this.getFinalGamesData();
  }

  getFinalGamesData(){
    this.dataService.getFinalsData();
  }

  toggleItem(index, childIndex) {

    this.dataService.finals[index].children[childIndex].open = !this.dataService.information[index].children[childIndex].open;
     //Aquí asignamos un valor a la variable position del json para saber en que seccion estamos.
     /*this.dataService.finals.forEach(element => {
       element.position="1"
     });*/
     this.dataService.finals[0].position="1";
  }

  toggleSection(index) {

    this.dataService.finals[index].open = !this.dataService.finals[index].open;
  
    if (this.automaticClose && this.dataService.finals[index].open) {
      this.dataService.finals
        .filter((item, itemIndex) => itemIndex != index)
        .map(item => item.open = false);
    }
         //Aquí asignamos un valor a la variable position del json para saber en que seccion estamos.
         this.dataService.finals[0].position="0";
  }

  setPosition(){
    console.log("SetPosition()")
    /*if(this.dataService.information[this.partida].tipo == "Simple"){
      this.player.position = this.dataService.information[this.partida].lastPosition+1;
      this.dataService.information[this.partida].lastPosition++;
    }
    else if(this.dataService.information[this.partida].tipo == "Match"){
      this.player.position = this.dataService.information[this.partida].children[this.match].lastPosition+1;
      this.dataService.information[this.partida].children[this.match].lastPosition++;
    }*/
  }

  ngOnInit() {
  }

}
