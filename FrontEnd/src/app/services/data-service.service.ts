import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { Storage } from "@ionic/storage";


@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  serverIP = "http://25.47.107.122:3000" //Hamachi
  //serverIP = "http://localhost:3000"
  //serverIP = "http://192.168.0.76:3000"
  information: any[];
  finals: any[];
  ranking: any;
  categoria: number;
  posicion: number = 0;
  menu = [
    {
      id: 1,
      src: "assets/img2/clasico.png"
    },
    {
      id: 2,
      src: "assets/img2/shot.png"
    },
    {
      id: 3,
      src: "assets/img2/lucha.png"
    },
    {
      id: 4,
      src: "assets/img2/run.png"
    },
  ]

  
  teamTest = {
    teamName: "Chingones",
    members:
      [
        {
          gamerTag: "boots",
          name: "Aaron",
          lastName: "Rocha",
          category: 1
        },
        {
          gamerTag: "Bruneiro",
          name: "Bruno",
          lastName: "Barboza",
          category: 2
        },
        {
          gamerTag: "Segundo",
          name: "Ana",
          lastName: "Segundo",
          category: 3
        },
        {
          gamerTag: "RickRichards",
          name: "Ricardo",
          lastName: "Garcia",
          category: 4
        }
      ]
  }

  //npm install @ionic-native/native-storage
  //ionic cordova plugin add cordova-sqlite-storage
  allCategories: string[] = [
    "Classic",
    "Shooter",
    "Figther",
    "Racer"
  ]

  teamList ;

  constructor(private http: HttpClient,
    private toastCtrl: ToastController,
    private storage: Storage
  ) {
    this.getGameData(1);

    //this.http.post("localhost:3000/teams/list",JSON.parse("{}")).subscribe(data =>{
      ///////this.sendDataToAPI(this.serverIP + "/teams/list", this.teamTest)
      //this.teamList = data || [];
      //console.log(data)
    //});
    /*
    this.storage.get('TeamList')
      .then(registros => {
        this.teamList = registros || [];
      });
      */
  }

  getFinalsData() {
    //console.log("Cargando datos de partida de categoria " + this.allCategories[category - 1])
    this.http.get('assets/finals.json').subscribe(res => {
      this.finals = res['items'];
      this.finals.forEach(element => {
        element.open = true
      });
      //this.finals[0].open = true;
      //console.log("Datos de partidas cargados");
    });
  }

  getGameData(category) {
    //console.log("Cargando datos de partida de categoria " + this.allCategories[category - 1])
    this.http.get('assets/information.json').subscribe(res => {
      this.information = res['items'];
      this.information[0].open = true;
      //console.log("Datos de partidas cargados");
    });
  }

  getDataFromAPI(url) {
    return this.http.get(`${url}`); 
  }

  postDataToAPI(url, data) {
    return this.http.post(`${url}`, data)/*.subscribe(data => {
      console.log(data);
      return data;
    }, error => {
      console.log(error);
    });*/
  }

  setWinnerPM(partida, match, player) {/*
    this.information[partida].children.forEach(p => {
      this.http.get('http://192.168.4.113:3000/scoreboard/categoria/' + categoria).subscribe(res => {
        this.ranking = res;
        this.ranking[0].open = true;
        console.log(res);
        console.log("Datos de ranking cargados");
      });
    });*/
  }

  setWinnerP(partida, player) {
  }
  /*
    sendTeam(team) {
      this.http.post('http://192.168.4.113:3000/teams/create/team', team)
        .subscribe(data => {
          console.log(data['_body']);
        }, error => {
          console.log(error);
        });
    }*/

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
    });
    return last;

  }
}
