import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController, AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { DataServiceService } from 'src/app/services/data-service.service';
import { RegisterPlayerPage } from '../register-player/register-player.page';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register-team',
  templateUrl: './register-team.page.html',
  styleUrls: ['./register-team.page.scss'],
})
export class RegisterTeamPage implements OnInit {

  constructor(private modalCtrl: ModalController,
    public toastCtrl: ToastController,
    private router: Router,
    private route: ActivatedRoute,
    public dataService: DataServiceService,
    public alertCtrl: AlertController,
    public http: HttpClient) { }

  mode = 0
  availableCateg = [];

  newTeam = {
    teamName: "",
    members:
      [
        {
          gamerTag: "",
          name: "",
          lastName: "",
          category: ""
        },
        {
          gamerTag: "",
          name: "",
          lastName: "",
          category: ""
        },
        {
          gamerTag: "",
          name: "",
          lastName: "",
          category: ""
        },
        {
          gamerTag: "",
          name: "",
          lastName: "",
          category: ""
        }
      ]
  }

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

  parametro: string;

  ngOnInit() {
    /*this.http.post('http://192.168.4.182:3000/groups',{"idCategoria": "10kfbkj"}).subscribe(data => {
    console.log("Hola2")  
    console.log(data);
    })*/;


    this.parametro = this.route.snapshot.paramMap.get('team');
    this.mode = parseInt(this.route.snapshot.paramMap.get('index'));
    if (this.parametro == null) {
    }
    else {
      this.newTeam = JSON.parse(this.parametro);
    }
  }

  deleteTeam() {
    this.dataService.deleteTeam(this.mode);
    this.router.navigateByUrl("main");
  }

  submitRegister() {//teams/create/team
    var completos = true;
    /*
    this.newTeam.members.forEach(element => {
      if (element.category == '') {
        this.presentToast('Team NOT Saved. Set category for alls players');
        completos = false;
      }
    });*/

    //Modo de guardado, si es registro nuevo o es una edición
    if (completos) {
      if (this.mode == -1)
        //this.dataService.addTeam(this.newTeam);
        this.dataService.sendDataToAPI(this.dataService.serverIP + "/teams/create/team", this.teamTest)
      //else
      //  this.dataService.updateTeam(this.mode, this.newTeam);
      

      this.router.navigateByUrl("main/team-list");
    }
  }

  trackByFn(index: any, item: any) {
    return index;
  }

  availableCategories(additionalCateg) {
    this.availableCateg = [];
    //toma el primer elemento de las categorias
    this.dataService.allCategories.forEach(categElem => {
      var bandera = false;

      //busca ese elementos en los datos de todos los jugadores
      this.newTeam.members.forEach(membElem => {
        if (membElem.category == categElem) {

          if (categElem == additionalCateg)
            this.availableCateg.push(additionalCateg);
          bandera = true;
        }
      });
      if (!bandera) {
        this.availableCateg.push(categElem);
      }
    });
  }

  async getPlayerDetails(i) {
    this.availableCategories(this.newTeam.members[i].category);
    const modal = await this.modalCtrl.create({
      component: RegisterPlayerPage,
      componentProps: {
        member: this.newTeam.members[i],
        categories: this.availableCateg
      }
    });
    await modal.present();

    const { data } = await modal.onDidDismiss();
    if (data != null)
      this.newTeam.members[i] = data;
  }

  async presentToast(msgToShow) {
    const toast = await this.toastCtrl.create({
      message: msgToShow,
      duration: 2000
    });
    toast.present();
  }

  async deleteAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Alert',
      //subHeader: 'Subtitle',
      message: 'Are you sure you want to delete this team?.',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.deleteTeam();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }]
    });

    await alert.present();
  }

}
