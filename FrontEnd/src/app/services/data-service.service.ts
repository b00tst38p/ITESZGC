import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { Storage } from "@ionic/storage";


@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  information: any[];
  categoria: number;
  posicion: number=0;

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

  getData(){
    this.http.get('assets/information.json').subscribe(res => {
      this.information = res['items'];

      this.information[0].open = true;
      console.log("Datos cargados");
    });
    
  }

  setWinnerPM(partida, match, player){
    this.information[partida].children.forEach(p =>{
      
    });
  }

  setWinnerP(partida, player){
    
  }

  ///Registro de equipos y jugadores
  addTeam(team) {
    this.teamList.push(team);
    this.storage.set('TeamList', this.teamList);
    this.presentToast("Team saved succesfully");
  }

  updateTeam(index, newTeam){
    this.teamList[index]=newTeam;
    this.storage.set('TeamList', this.teamList);
    this.presentToast("Team updated succesfully");
  }

  deleteTeam(index){
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
}
