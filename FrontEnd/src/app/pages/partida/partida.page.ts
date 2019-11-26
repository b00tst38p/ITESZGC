import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataServiceService } from 'src/app/services/data-service.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-partida',
  templateUrl: './partida.page.html',
  styleUrls: ['./partida.page.scss'],
})
export class PartidaPage implements OnInit {
  automaticClose = false;
  //miPosicion = 0;
  title
  information: any[];
  constructor(private http: HttpClient, 
    private dataService: DataServiceService, 
    private toastCtrl: ToastController,
  ) {
    this.getGameData(1);
  }

  getGameData(category){
    this.title = this.dataService.allCategories[category-1]
    this.dataService.getGameData(category);
  }

  async estadoPartida() {

    let toast = await this.toastCtrl.create({
      message: `La partida ha sido guardada!`,
      duration: 2000
    });
    toast.present();
  }

  toggleSection(index) {

    this.dataService.information[index].open = !this.dataService.information[index].open;
  
    if (this.automaticClose && this.dataService.information[index].open) {
      this.dataService.information
        .filter((item, itemIndex) => itemIndex != index)
        .map(item => item.open = false);
    }
         //Aquí asignamos un valor a la variable position del json para saber en que seccion estamos.
         this.dataService.information[0].position="0";
  }

  toggleItem(index, childIndex) {

    this.dataService.information[index].children[childIndex].open = !this.dataService.information[index].children[childIndex].open;
     //Aquí asignamos un valor a la variable position del json para saber en que seccion estamos.
     this.dataService.information[0].position="1";
  }

  reset(match, partida) {
    if(this.dataService.information[partida].tipo == "Simple") {
      this.dataService.information[partida].lastPosition = 0;
      this.dataService.information[partida].children.forEach(element => {
        element.position = "0"
      });
    }
    else if(this.dataService.information[partida].tipo == "Match"){
      this.dataService.information[partida].children.forEach(element => {
        element.lastPosition = 0;
        element.jugadores.forEach(element2 => {
          element2.position = "0"
        });
      });
    }
  
  }

  ngOnInit() { }

}
