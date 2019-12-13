import { Component, OnInit } from '@angular/core';
//import { HttpClient } from '@angular/common/http';
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
  information 
  datos = [
    {
      "partida": 2,
      "tipo": 2,
      "jugadores": [
        {
          "name": "Ango",
          "equipo": "El Team y Turner",
          "puntos": 0,
          "grupo": 1
        },
        {
          "name": "Cecon",
          "equipo": "Los Moroleones",
          "puntos": 0,
          "grupo": 1
        },
        {
          "name": "PedLop",
          "equipo": "El Team Burton",
          "puntos": 0,
          "grupo": 1
        },
        {
          "name": "Beaber",
          "equipo": "Los Malitos",
          "puntos": 0,
          "grupo": 1
        }
      ]
    }
  ]

  constructor(
    //private http: HttpClient, 
    private dataService: DataServiceService, 
    private toastCtrl: ToastController,
  ) {
  }

  ngOnInit() { 
    this.getGameData(1);
  }

  getGameData(category){
    this.title = this.dataService.allCategories[category-1]
    //this.dataService.getGameData(category);
    this.dataService.getDataFromAPI(this.dataService.serverIP + "/partidas/mostrar/" + category).subscribe((data) => {
      this.information = data
      this.information[0].open = true;
      if(category == 2 || category == 4){
        this.setPositionProperty(this.information)
      }
      console.log("datos")
      console.log(this.information)
    });
  }

  setPositionProperty(vector){
    for(let elemento of vector){
      elemento['lastPosition']=0
      for(let jugador of elemento.jugadores){
        jugador['position']=0
      }
    }
  }

  async estadoPartida() {

    let toast = await this.toastCtrl.create({
      message: `La partida ha sido guardada!`,
      duration: 2000
    });
    toast.present();
  }

  toggleSection(index) {

    this.information[index].open = !this.information[index].open;
  
    if (this.automaticClose && this.information[index].open) {
      this.information
        .filter((item, itemIndex) => itemIndex != index)
        .map(item => item.open = false);
    }
         //Aquí asignamos un valor a la variable position del json para saber en que seccion estamos.
         this.information[0].position="0";
  }

  toggleItem(index, childIndex) {

    this.information[index].children[childIndex].open = !this.information[index].children[childIndex].open;
     //Aquí asignamos un valor a la variable position del json para saber en que seccion estamos.
     this.information[0].position="1";
  }

  reset(match, partida) {
    if(this.information[partida].tipo == 2) {
      this.information[partida].lastPosition = 0;
      for(let element of this.information[partida].children){
      //this.information[partida].children.forEach(element => {
        element.position = "0"
      }
    }
    /*else if(this.information[partida].tipo == 1){
      for(let element of this.information[partida].children){
      //this.information[partida].children.forEach(element => {
        element.lastPosition = 0;
        for(let element2 of element.jugadores)
        //element.jugadores.forEach(element2 => {
          element2.position = "0"
        }
      }
    }*/
  
  }

}
