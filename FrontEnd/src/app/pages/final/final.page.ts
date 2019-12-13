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
  finals;

  constructor(
    private dataService: DataServiceService,
    private toastCtrl: ToastController,
  ) {

    this.getFinalGamesData();
  }

  async getFinalGamesData() {
    //this.dataService.getDataFromAPI(this.dataService.serverIP + '/alguna ruta/');
    this.dataService.getDataFromAPI('assets/finals.json')
      .subscribe(data => {
        console.log(data)
        //this.finals = data;
        this.finals = data['items'];
        this.finals.forEach(element => {
          element.open = true
        });
      });

  }

  toggleItem(index, childIndex) {

    this.dataService.finals[index].children[childIndex].open = !this.dataService.information[index].children[childIndex].open;
    //Aquí asignamos un valor a la variable position del json para saber en que seccion estamos.

    this.dataService.finals[0].position = "1";
  }

  toggleSection(index) {

    this.finals[index].open = !this.finals[index].open;

    if (this.automaticClose && this.finals[index].open) {
      this.finals
        .filter((item, itemIndex) => itemIndex != index)
        .map(item => item.open = false);
    }
    //Aquí asignamos un valor a la variable position del json para saber en que seccion estamos.
    this.finals[0].position = "0";
  }

  setPosition() {
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
    this.getFinalGamesData();
  }

}
