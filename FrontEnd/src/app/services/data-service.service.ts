import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { Storage } from "@ionic/storage";


@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  information: any[];
  ranking: any;
  categoria: number;
  posicion: number = 0;

  //npm install @ionic-native/native-storage
  //ionic cordova plugin add cordova-sqlite-storage
  allCategories: string[] = [
    "Classic",
    "Shooter",
    "Figther",
    "Racer"
  ]

  teamList = [
  ];

  constructor(private http: HttpClient,
    private toastCtrl: ToastController,
    private storage: Storage
  ) {
    this.getData();

    this.storage.get('TeamList')
      .then(registros => {
        this.teamList = registros || [];
      });
  }

  getData() {
    this.http.get('assets/information.json').subscribe(res => {
      this.information = res['items'];

      this.information[0].open = true;
      console.log("Datos de partidas cargados");
    });
  }

  getDataFromAPI(url){
    return this.http.get(`${url}`);
  }

  getRanking(categoria){
   /*
    this.http.get('http://192.168.4.180:3000/scoreboard/categoria/' + categoria).subscribe(res => {
      this.ranking = res;
      this.ranking[0].open = true;
      console.log(res);
      console.log("Datos de ranking cargados");
    });*/
    this.http.get('assets/ranking.json').subscribe(res => {
      this.ranking = res['datos'];

      this.ranking[0].open = true;
      console.log("Datos de ranking cargados");
    });
  }

  setWinnerPM(partida, match, player) {
    this.information[partida].children.forEach(p => {

    });
  }

  setWinnerP(partida, player) {

  }

  ///Registro de equipos y jugadores
  addTeam(team) {
    this.teamList.push(team);
    this.storage.set('TeamList', this.teamList);
    this.presentToast("Team saved succesfully");
  }

  updateTeam(index, newTeam) {
    this.teamList[index] = newTeam;
    this.storage.set('TeamList', this.teamList);
    this.presentToast("Team updated succesfully");
  }

  deleteTeam(index) {
    this.teamList.splice(index, 1);
    this.storage.set('TeamList', this.teamList);
    this.presentToast("Team deleted succesfully");
  }

  async presentToast(msgToShow) {
    const toast = await this.toastCtrl.create({
      message: msgToShow,
      duration: 2000
    });
    toast.present();
  }


  //Obtener la posición del último jugador registrdo hasta el momento
  getTheLastInPartida(partida) {
    var last: number = 0;
    this.information[partida].children.forEach(element => {
      if (element.estado > last) {
        last = element.estado;
      }
    });
    return last;
  }

  getTheLastInMatch(partida, match) {
    var last: number = 0;
    this.information[partida].children.forEach(element => {
      //falta recorrer los match y luego ya los participantes...

      if (element.estado > last) {
        last = element.estado;
      }
    }); return last;

  }
}
