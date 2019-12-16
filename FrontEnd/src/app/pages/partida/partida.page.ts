import { Component, OnInit } from '@angular/core';
//import { HttpClient } from '@angular/common/http';
import { DataServiceService } from 'src/app/services/data-service.service';
import { ToastController, LoadingController } from '@ionic/angular';

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
  loading: any
  /*datos = [
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
  ]*/

  constructor(
    //private http: HttpClient, 
    private dataService: DataServiceService,
    private toastCtrl: ToastController,
    public loadingCtrl: LoadingController
  ) {
  }

  ngOnInit() {
    this.getGameData(1);
  }

  async getGameData(category) {
    this.title = this.dataService.allCategories[category - 1]
    try {
      this.loading = await this.loadingCtrl.create({
        //duration: 10000,
        message: "Please wait...",
        backdropDismiss: true
        //this.presentToast("No se pudo obtener los datos del servidor.")
      });
      await this.loading.present();
      this.dataService.getDataFromAPI(this.dataService.serverIP + "/partidas/mostrar/" + category).subscribe((data) => {
        let completo = false
        if (category == 2 || category == 4) {
          this.setPositionProperty(data)
        }
        else {
          let aux
          aux = data
          aux.forEach(grupo => {
            grupo.jugadores = this.convertToMAtchFormat(grupo.jugadores)

          });
        }
        this.information = data
        if(this.information.length>0)
          this.information[0].open = true;
        
        console.log("datos de " + this.dataService.allCategories[category - 1])
        console.log(this.information)
        completo = true
        this.loadingCtrl.dismiss();
      });
    }
    catch (e) {

      console.log("Error: " + e);
      return null;
    }


  }

  convertToMAtchFormat(jugadores) {
    let matches = []
    jugadores.forEach(element => {
      let matchId = element.match;
      let match = {
        name: matchId,
        listaJugadores: []
      }
      let lista = []

      let i = 0
      while (jugadores.length > i) {
        if (jugadores[i].match == matchId) {
          lista.push(jugadores[i])
          jugadores.splice(i, 1)
        }
        else {
          i++;
        }
      }

      match.listaJugadores = lista
      matches.push(match)
    });
    this.setPositionProperty(matches)
    return matches;
  }

  setPositionProperty(vector) {
    for (let elemento of vector) {
      elemento['lastPosition'] = 0
      if (elemento.jugadores)
        for (let jugador of elemento.jugadores) {
          jugador['position'] = 0
        }
      else if (elemento.listaJugadores) {
        for (let jugador of elemento.listaJugadores) {
          jugador['position'] = 0
        }
      }
    }
  }

  async enviarResultados(indice, partida) {
    console.log("Enviando partida " + partida + " indice " + indice)
    let completo = true

    if (this.information[indice].tipo == 2 || this.information[indice].tipo == 4) {
      this.information[indice].jugadores.forEach(jugador => {
        if (jugador.position == 0) {
          completo = false
        }
      });
      if(completo){
        this.information[indice].jugadores.forEach(jugador => {
          
          console.log((jugador.position-1) + " " + this.information[indice].tipo)
          console.log("Asignando a " + jugador.idParticipante)
          jugador.puntos = this.getPoints((jugador.position-1), this.information[indice].tipo)
          this.dataService.postDataToAPI(this.dataService.serverIP + "/partidas/asignarpuntaje", jugador).subscribe(data => {
            console.log(data);
          }, error => {
            console.log(error);
          });
        });
        this.presentToast("Datos enviados")
      }
      else{
        this.presentToast("Completa los datos de la partida")
      }
    }

    if (this.information[indice].tipo == 1 || this.information[indice].tipo == 3) {
      this.information[indice].jugadores.forEach(match => {
        match.listaJugadores.forEach(jugador => {
          if (jugador.position == 0) {
            completo = false
          }
        });
      });

      if(completo){

        this.information[indice].jugadores.forEach(match => {
          match.listaJugadores.forEach(jugador => {
            console.log((jugador.position-1) + " " + this.information[indice].tipo)
            console.log("Asignando a " + jugador.idParticipante)
            jugador.puntos = this.getPoints((jugador.position-1), this.information[indice].tipo)

            this.dataService.postDataToAPI(this.dataService.serverIP + "/partidas/asignarpuntaje", jugador).subscribe(data => {
              console.log(data);
            }, error => {
              console.log(error);
            });
            
          });
        });
        this.presentToast("Datos enviados")
      }
      else{
        this.presentToast("Completa los datos de la partida")
      }
    }

    if(completo){
      //cerramos la partida
      this.dataService.getDataFromAPI(this.dataService.serverIP + "/partidas/terminar/" + this.information[indice].partida ).subscribe(data => {
        console.log(data);
      }, error => {
        console.log(error);
      });
      //
    }
    
    //reseteas la lista de partidas
    this.getGameData(this.information[indice].tipo)
  }

  getPoints(position, category){
    let puntos = []
    if(category == 4){
      puntos = [4,3,2,1]      
    }
    else if(category == 2){
      puntos = [4,4,3,3,2,2,1,1]
    }
    else{
      puntos = [2,1]
    }
    return puntos[position];
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
    this.information[0].position = "0";
  }

  toggleItem(partida, match) {
    this.information[partida].jugadores[match].open = !this.information[partida].jugadores[match].open;
    this.information[0].position = "1";
  }

  reset(partida) {
    if (this.information[partida].tipo == 2 || this.information[partida].tipo == 4) {
      this.information[partida].lastPosition = 0;
      for (let jugador of this.information[partida].jugadores) {
        //this.information[partida].children.forEach(element => {
        jugador.position = 0
      }
    }
    else {
      for (let match of this.information[partida].jugadores) {
        match.lastPosition = 0;
        match.listaJugadores.forEach(jugador => {
          jugador.position = 0
        });
      }
    }

  }

  async presentToast(msgToShow) {
    const toast = await this.toastCtrl.create({
      message: msgToShow,
      duration: 2000
    });
    toast.present();
  }

  setPosition(player, partida, match) {
    if (this.information[partida].tipo == "2" || this.information[partida].tipo == "4") {
      player.position = this.information[partida].lastPosition + 1;
      this.information[partida].lastPosition++;
    }
    else if (this.information[partida].tipo == "1" || this.information[partida].tipo == "3") {
      player.position = this.information[partida].jugadores[match].lastPosition + 1;
      this.information[partida].jugadores[match].lastPosition++;
    }
  }

}
